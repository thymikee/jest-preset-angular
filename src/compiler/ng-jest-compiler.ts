import { CompilerHost, CompilerOptions } from '@angular/compiler-cli';
import { createCompilerHost } from '@angular/compiler-cli/src/transformers/compiler_host';
import type { Logger } from 'bs-logger';
import { updateOutput } from 'ts-jest/dist/compiler/compiler-utils';
import type {
  CompilerInstance,
  TTypeScript,
  ResolvedModulesMap,
  TsJestAstTransformer,
  TsCompilerInstance,
} from 'ts-jest/dist/types';
import type * as ts from 'typescript';

import type { NgJestConfig } from '../config/ng-jest-config';
import { factory as constructorDownlevelCtor } from '../transformers/downlevel-ctor';
import { factory as replaceResources } from '../transformers/replace-resources';

import { NgJestCompilerHost } from './compiler-host';

interface PatchedTranspileOptions {
  fileName: string;
  compilerOptions: ts.CompilerOptions;
  moduleName?: string;
  renamedDependencies?: ts.MapLike<string>;
}

export class NgJestCompiler implements CompilerInstance {
  private _compilerOptions!: CompilerOptions;
  private _program: ts.Program | undefined;
  private _compilerHost: CompilerHost | undefined;
  private _tsHost: NgJestCompilerHost | undefined;
  private _rootNames: string[] = [];
  private readonly _initialCompilerOptions: CompilerOptions;
  private readonly _logger: Logger;
  private readonly _ts: TTypeScript;

  constructor(readonly ngJestConfig: NgJestConfig, readonly jestCacheFS: Map<string, string>) {
    this._logger = this.ngJestConfig.logger;
    this._ts = this.ngJestConfig.compilerModule;
    this._initialCompilerOptions = { ...this.ngJestConfig.parsedTsConfig.options };
    this._setupOptions(this.ngJestConfig);

    this._logger.debug('created NgJestCompiler');
  }

  getResolvedModulesMap(fileContent: string, fileName: string): ResolvedModulesMap {
    this._tsHost?.updateMemoryHost(fileName, fileContent);

    // eslint-disable-next-line
    return (this._program?.getSourceFile(fileName) as any)?.resolvedModules;
  }

  getCompiledOutput(fileName: string, fileContent: string, supportsStaticESM: boolean): string {
    const customTransformers = this.ngJestConfig.resolvedTransformers;
    let moduleKind = this._initialCompilerOptions.module;
    let esModuleInterop = this._initialCompilerOptions.esModuleInterop;
    let allowSyntheticDefaultImports = this._initialCompilerOptions.allowSyntheticDefaultImports;
    if (supportsStaticESM && this.ngJestConfig.useESM) {
      moduleKind =
        !moduleKind ||
        (moduleKind &&
          ![this._ts.ModuleKind.ES2015, this._ts.ModuleKind.ES2020, this._ts.ModuleKind.ESNext].includes(moduleKind))
          ? this._ts.ModuleKind.ESNext
          : moduleKind;
      // Make sure `esModuleInterop` and `allowSyntheticDefaultImports` true to support import CJS into ESM
      esModuleInterop = true;
      allowSyntheticDefaultImports = true;
    } else {
      moduleKind = this._ts.ModuleKind.CommonJS;
    }
    this._compilerOptions = {
      ...this._compilerOptions,
      allowSyntheticDefaultImports,
      esModuleInterop,
      module: moduleKind,
    };

    if (this._program) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this._tsHost!.updateMemoryHost(fileName, fileContent);

      let sourceFile: ts.SourceFile | undefined;
      if (!this._rootNames.includes(fileName)) {
        this._logger.debug({ fileName }, 'getCompiledOutput: adding file to rootNames and updating Program');
        this._rootNames = [...this._rootNames, fileName];
        this._createOrUpdateProgram();
        sourceFile = this._program.getSourceFile(fileName);
      } else {
        sourceFile = this._program.getSourceFile(fileName);
        if (sourceFile) {
          const replaceSpan: ts.TextSpan = { start: 0, length: sourceFile.text.length };
          sourceFile.update(fileContent, { span: replaceSpan, newLength: fileContent.length });
        }
      }

      this._logger.debug({ fileName }, 'getCompiledOutput: compiling using Program');

      const emitResult = this._program.emit(
        sourceFile,
        undefined,
        undefined,
        undefined,
        this.makeTransformers(customTransformers, this._program),
      );

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const compiledOutput: [string, string] = this._tsHost!.getEmittedResult();
      const allDiagnostics: ts.Diagnostic[] = [];
      if (this.ngJestConfig.shouldReportDiagnostics(fileName)) {
        this._logger.debug({ fileName }, 'getCompiledOutput: getting diagnostics');

        allDiagnostics.push(
          ...emitResult.diagnostics,
          ...this._program.getSyntacticDiagnostics(sourceFile),
          ...this._program.getSemanticDiagnostics(sourceFile),
        );
      }
      if (!allDiagnostics.length) {
        this._logger.debug({ fileName }, 'getCompiledOutput: update compiled output including inline source map');

        return updateOutput(compiledOutput[0], fileName, compiledOutput[1]);
      } else {
        this.ngJestConfig.raiseDiagnostics(allDiagnostics, fileName);

        return '';
      }
    } else {
      this._logger.debug({ fileName }, 'getCompiledOutput: compiling as isolated module');

      const result: ts.TranspileOutput = this._transpileModule(
        fileContent,
        {
          fileName,
          compilerOptions: this._compilerOptions,
        },
        customTransformers,
      );
      if (result.diagnostics && this.ngJestConfig.shouldReportDiagnostics(fileName)) {
        this.ngJestConfig.raiseDiagnostics(result.diagnostics, fileName, this._logger);
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return updateOutput(result.outputText, fileName, result.sourceMapText!);
    }
  }

  private _setupOptions({ parsedTsConfig }: NgJestConfig): void {
    this._logger.debug({ parsedTsConfig }, '_setupOptions: initializing compiler config');

    this._compilerOptions = { ...this._initialCompilerOptions };
    this._rootNames = parsedTsConfig.rootNames.filter((rootName) => !this.ngJestConfig.isTestFile(rootName));
    if (this._compilerOptions.strictMetadataEmit) {
      this._logger.warn(
        `Using Angular compiler option 'strictMetadataEmit' for applications might cause undefined behavior.`,
      );
    }
    if (!this.ngJestConfig.isolatedModules) {
      this._logger.debug(
        { compilerOptions: this._compilerOptions },
        '_setupOptions: creating Compiler Host using @angular/compiler-cli createCompilerHost',
      );

      this._tsHost = new NgJestCompilerHost(this._logger, this.ngJestConfig, this.jestCacheFS);
      this._compilerHost = createCompilerHost({
        options: this._compilerOptions,
        tsHost: this._tsHost,
      });
      this._createOrUpdateProgram();
    }
  }

  private _createOrUpdateProgram(): void {
    const oldTsProgram = this._program;

    this._logger.debug(`_createOrUpdateProgram: ${oldTsProgram ? 'update' : 'create'} TypeScript Program`);

    this._program = this._ts.createProgram(this._rootNames, this._compilerOptions, this._compilerHost, oldTsProgram);
  }

  /**
   * Copy from https://github.com/microsoft/TypeScript/blob/master/src/services/transpile.ts
   * This is required because the exposed function `transpileModule` from TypeScript doesn't allow to access `Program`
   * and we need `Program` to be able to use Angular `replace-resources` transformer.
   */
  private _transpileModule(
    fileContent: string,
    transpileOptions: PatchedTranspileOptions,
    customTransformers: TsJestAstTransformer,
  ): ts.TranspileOutput {
    const diagnostics: ts.Diagnostic[] = [];
    const options: ts.CompilerOptions = transpileOptions.compilerOptions
      ? // @ts-expect-error internal TypeScript API
        this._ts.fixupCompilerOptions(transpileOptions.compilerOptions, diagnostics)
      : {};

    // mix in default options
    const defaultOptions = this._ts.getDefaultCompilerOptions();
    for (const key in defaultOptions) {
      // @ts-expect-error internal TypeScript API
      if (this._ts.hasProperty(defaultOptions, key) && options[key] === undefined) {
        options[key] = defaultOptions[key];
      }
    }

    // @ts-expect-error internal TypeScript API
    for (const option of this._ts.transpileOptionValueCompilerOptions) {
      options[option.name] = option.transpileOptionValue;
    }

    /**
     * transpileModule does not write anything to disk so there is no need to verify that there are no conflicts between
     * input and output paths.
     */
    options.suppressOutputPathCheck = true;

    // Filename can be non-ts file.
    options.allowNonTsExtensions = true;

    // if jsx is specified then treat file as .tsx
    const inputFileName =
      transpileOptions.fileName ||
      (transpileOptions.compilerOptions && transpileOptions.compilerOptions.jsx ? 'module.tsx' : 'module.ts');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const sourceFile = this._ts.createSourceFile(inputFileName, fileContent, options.target!); // TODO: GH#18217
    if (transpileOptions.moduleName) {
      sourceFile.moduleName = transpileOptions.moduleName;
    }

    if (transpileOptions.renamedDependencies) {
      // @ts-expect-error internal TypeScript API
      sourceFile.renamedDependencies = new Map(getEntries(transpileOptions.renamedDependencies));
    }

    // @ts-expect-error internal TypeScript API
    const newLine = this._ts.getNewLineCharacter(options);

    // Output
    let outputText: string | undefined;
    let sourceMapText: string | undefined;

    // Create a compilerHost object to allow the compiler to read and write files
    const compilerHost: ts.CompilerHost = {
      // @ts-expect-error internal TypeScript API
      getSourceFile: (fileName) => (fileName === this._ts.normalizePath(inputFileName) ? sourceFile : undefined),
      writeFile: (name, text) => {
        // @ts-expect-error internal TypeScript API
        if (this._ts.fileExtensionIs(name, '.map')) {
          // @ts-expect-error internal TypeScript API
          this._ts.Debug.assertEqual(sourceMapText, undefined, 'Unexpected multiple source map outputs, file:', name);
          sourceMapText = text;
        } else {
          // @ts-expect-error internal TypeScript API
          this._ts.Debug.assertEqual(outputText, undefined, 'Unexpected multiple outputs, file:', name);
          outputText = text;
        }
      },
      getDefaultLibFileName: () => 'lib.d.ts',
      useCaseSensitiveFileNames: () => false,
      getCanonicalFileName: (fileName) => fileName,
      getCurrentDirectory: () => '',
      getNewLine: () => newLine,
      fileExists: (fileName): boolean => fileName === inputFileName,
      readFile: () => '',
      directoryExists: () => true,
      getDirectories: () => [],
    };

    const program = this._ts.createProgram([inputFileName], options, compilerHost);
    if (this.ngJestConfig.shouldReportDiagnostics(inputFileName)) {
      // @ts-expect-error internal TypeScript API
      this._ts.addRange(/*to*/ diagnostics, /*from*/ program.getSyntacticDiagnostics(sourceFile));
      // @ts-expect-error internal TypeScript API
      this._ts.addRange(/*to*/ diagnostics, /*from*/ program.getOptionsDiagnostics());
    }
    // Emit
    program.emit(
      /*targetSourceFile*/ undefined,
      /*writeFile*/ undefined,
      /*cancellationToken*/ undefined,
      /*emitOnlyDtsFiles*/ undefined,
      this.makeTransformers(customTransformers, program),
    );

    // @ts-expect-error internal TypeScript API
    if (outputText === undefined) return this._ts.Debug.fail('Output generation failed');

    return { outputText, diagnostics, sourceMapText };
  }

  private makeTransformers(customTransformers: TsJestAstTransformer, program: ts.Program): ts.CustomTransformers {
    return {
      before: [
        ...customTransformers.before.map((beforeTransformer) =>
          beforeTransformer.factory({ configSet: this.ngJestConfig, program }, beforeTransformer.options),
        ),
        replaceResources({ program } as TsCompilerInstance),
        constructorDownlevelCtor({ program } as TsCompilerInstance),
      ] as Array<ts.TransformerFactory<ts.SourceFile> | ts.CustomTransformerFactory>,
      after: customTransformers.after.map((afterTransformer) =>
        afterTransformer.factory({ configSet: this.ngJestConfig, program }, afterTransformer.options),
      ) as Array<ts.TransformerFactory<ts.SourceFile> | ts.CustomTransformerFactory>,
      afterDeclarations: customTransformers.afterDeclarations.map((afterDeclarations) =>
        afterDeclarations.factory({ configSet: this.ngJestConfig, program }, afterDeclarations.options),
      ) as Array<ts.TransformerFactory<ts.SourceFile | ts.Bundle>>,
    };
  }
}
