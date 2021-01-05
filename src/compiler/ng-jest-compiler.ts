import { CompilerHost, CompilerOptions, createCompilerHost } from '@angular/compiler-cli';
import type { Logger } from 'bs-logger';
import { updateOutput } from 'ts-jest/dist/compiler/compiler-utils';
import type { CompilerInstance, TTypeScript, ResolvedModulesMap } from 'ts-jest/dist/types';
import type * as ts from 'typescript';

import type { NgJestConfig } from '../config/ng-jest-config';
import { factory as downlevelCtor } from '../transformers/downlevel-ctor';
import { factory as inlineFiles } from '../transformers/inline-files';
import { factory as stripStyles } from '../transformers/strip-styles';
import { NgJestCompilerHost } from './compiler-host';

export class NgJestCompiler implements CompilerInstance {
  private _compilerOptions!: CompilerOptions;
  private _program: ts.Program | undefined;
  private _compilerHost: CompilerHost | undefined;
  private _tsHost: NgJestCompilerHost | undefined;
  private _rootNames: string[] = [];
  private readonly _logger: Logger;
  private readonly _ts: TTypeScript;

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
    const transformers = {
      ...customTransformers,
      before: [
        // hoisting from `ts-jest` or other before transformers
        ...(customTransformers.before as ts.TransformerFactory<ts.SourceFile>[]),
        inlineFiles(this.ngJestConfig),
        stripStyles(this.ngJestConfig),
      ],
    };
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
        ...transformers,
        before: [
          // hoisting from `ts-jest` or other before transformers
          ...transformers.before,
          /**
           * Downlevel constructor parameters for DI support. This is required to support forwardRef in ES2015 due to
           * TDZ issues. This wrapper is needed here due to the program not being available until after
           * the transformers are created. Also because program can be updated so we can't push this transformer in
           * _createCompilerHost
           */
          downlevelCtor(this._program),
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

      const result: ts.TranspileOutput = this._ts.transpileModule(fileContent, {
        fileName,
        transformers,
        compilerOptions: {
          ...this._compilerOptions,
          module: moduleKind,
        },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        reportDiagnostics: this.ngJestConfig.shouldReportDiagnostics(fileName),
      });
      if (result.diagnostics && this.ngJestConfig.shouldReportDiagnostics(fileName)) {
        this.ngJestConfig.raiseDiagnostics(result.diagnostics, fileName, this._logger);
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return updateOutput(result.outputText, fileName, result.sourceMapText!);
    }
  }

  private _setupOptions({ parsedTsConfig }: NgJestConfig) {
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
}
