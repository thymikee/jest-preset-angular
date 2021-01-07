import { CompilerHost, CompilerOptions } from '@angular/compiler-cli';
import { createCompilerHost } from '@angular/compiler-cli/src/transformers/compiler_host';
import type { Logger } from 'bs-logger';
import { updateOutput } from 'ts-jest/dist/compiler/compiler-utils';
import type { CompilerInstance, TTypeScript, ResolvedModulesMap } from 'ts-jest/dist/types';
import type * as ts from 'typescript';

import type { NgJestConfig } from '../config/ng-jest-config';
import { constructorParametersDownlevelTransform } from '../transformers/downlevel-ctor';
import { replaceResources } from '../transformers/replace-resources';

import { NgJestCompilerHost } from './compiler-host';

interface PatchedTranspileOptions {
  fileName: string;
  compilerOptions: ts.CompilerOptions;
  moduleName?: string;
  renamedDependencies?: ts.MapLike<string>;
}

export class NgJestCompiler implements CompilerInstance {
  private _compilerOptions!: CompilerOptions;
  private _program!: ts.Program;
  private _compilerHost: CompilerHost | undefined;
  private _tsHost: NgJestCompilerHost | undefined;
  private _rootNames: string[] = [];
  private readonly _logger: Logger;
  private readonly _ts: TTypeScript;
  private readonly isAppPath = (fileName: string) =>
    !fileName.endsWith('.ngfactory.ts') && !fileName.endsWith('.ngstyle.ts');

  constructor(readonly ngJestConfig: NgJestConfig, readonly jestCacheFS: Map<string, string>) {
    this._logger = this.ngJestConfig.logger;
    this._ts = this.ngJestConfig.compilerModule;
    this._setupOptions(this.ngJestConfig);

    this._logger.debug('created NgJestCompiler');
  }

  getResolvedModulesMap(fileContent: string, fileName: string): ResolvedModulesMap {
    this._tsHost?.updateMemoryHost(fileName, fileContent);

    // eslint-disable-next-line
    return (this._program?.getSourceFile(fileName) as any)?.resolvedModules;
  }

  getCompiledOutput(fileName: string, fileContent: string, supportsStaticESM: boolean): string {
    const customTransformers = this.ngJestConfig.customTransformers;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const getTypeChecker = () => this._program!.getTypeChecker();
    if (this._program) {
      const allDiagnostics = [];
      if (!this._rootNames.includes(fileName)) {
        this._logger.debug({ fileName }, 'getCompiledOutput: update memory host, rootFiles and Program');

        this._rootNames = [...this._rootNames, fileName];
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this._tsHost!.updateMemoryHost(fileName, fileContent);
        this._createOrUpdateProgram();
      }

      this._logger.debug({ fileName }, 'getCompiledOutput: compiling using Program');

      const sourceFile = this._program.getSourceFile(fileName);
      const emitResult = this._program.emit(sourceFile, undefined, undefined, undefined, {
        ...customTransformers,
        before: [
          ...(customTransformers.before as Array<ts.TransformerFactory<ts.SourceFile>>),
          /**
           * Downlevel constructor parameters for DI support. This is required to support forwardRef in ES2015 due to
           * TDZ issues. This wrapper is needed here due to the program not being available until after
           * the transformers are created. Also because program can be updated so we can't push this transformer in
           * _createCompilerHost
           */
          constructorParametersDownlevelTransform(this._program),
          replaceResources(this.isAppPath, getTypeChecker),
        ],
      });
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const compiledOutput: [string, string] = this._tsHost!.getEmittedResult();
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
      let moduleKind = this._compilerOptions.module;
      if (supportsStaticESM && this.ngJestConfig.useESM) {
        moduleKind =
          !moduleKind ||
          (moduleKind &&
            ![this._ts.ModuleKind.ES2015, this._ts.ModuleKind.ES2020, this._ts.ModuleKind.ESNext].includes(moduleKind))
            ? this._ts.ModuleKind.ESNext
            : moduleKind;
      } else {
        moduleKind = this._ts.ModuleKind.CommonJS;
      }

      this._logger.debug({ fileName }, 'getCompiledOutput: compiling as isolated module');

      const result: ts.TranspileOutput = this._transpileModule(
        fileContent,
        {
          fileName,
          compilerOptions: {
            ...this._compilerOptions,
            module: moduleKind,
          },
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

    this._compilerOptions = { ...parsedTsConfig.options };
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
    customTransformers: ts.CustomTransformers,
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

    // transpileModule does not write anything to disk so there is no need to verify that there are no conflicts between input and output paths.
    options.suppressOutputPathCheck = true;

    // Filename can be non-ts file.
    options.allowNonTsExtensions = true;

    // if jsx is specified then treat file as .tsx
    const inputFileName =
      transpileOptions.fileName ||
      (transpileOptions.compilerOptions && transpileOptions.compilerOptions.jsx ? 'module.tsx' : 'module.ts');
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
      {
        ...customTransformers,
        before: [
          // hoisting from `ts-jest` or other before transformers
          ...(customTransformers.before as Array<ts.TransformerFactory<ts.SourceFile>>),
          replaceResources(this.isAppPath, program.getTypeChecker),
        ],
      },
    );

    // @ts-expect-error internal TypeScript API
    if (outputText === undefined) return this._ts.Debug.fail('Output generation failed');

    return { outputText, diagnostics, sourceMapText };
  }
}
