import { CompilerHost, CompilerOptions, createCompilerHost, Diagnostic } from '@angular/compiler-cli';
import { hasErrors } from '@ngtools/webpack/src/diagnostics';
import type { Logger } from 'bs-logger';
import { normalize } from 'path';
import { updateOutput } from 'ts-jest/dist/compiler/instance';
import { LINE_FEED } from 'ts-jest/dist/constants';
import type { TTypeScript } from 'ts-jest/dist/types';
import type * as ts from 'typescript';

import type { NgJestConfig } from '../config/ng-jest-config';
import { factory as downlevelCtor } from '../transformers/downlevel-ctor';

export class NgJestCompiler {
  private _compilerOptions!: CompilerOptions;
  private _program: ts.Program | undefined;
  private _compilerHost!: CompilerHost;
  private _rootNames: string[] = [];
  private _allDiagnostics: Array<ts.Diagnostic | Diagnostic> = [];
  private readonly _sourceFileCache: Map<string, ts.SourceFile> = new Map<string, ts.SourceFile>();
  private readonly _memoryHost: Map<string, string> = new Map<string, string>();
  private readonly _logger: Logger;
  private readonly _ts: TTypeScript;

  constructor(private readonly ngJestConfig: NgJestConfig) {
    this._logger = this.ngJestConfig.logger;
    this._ts = this.ngJestConfig.compilerModule;
    this._setupOptions(this.ngJestConfig);

    this._logger.debug('created NgJestCompiler');
  }

  getCompiledOutput(fileName: string, fileContent: string): string {
    if (this._program) {
      if (!this._rootNames.includes(fileName)) {
        this._logger.debug({ fileName }, 'getCompiledOutput: update memory host, rootFiles and Program');

        this._rootNames = [...this._rootNames, fileName];
        this._memoryHost.set(fileName, fileContent);
        this._createOrUpdateProgram();
      }
      this._logger.debug({ fileName }, 'getCompiledOutput: compiling using Program');

      const compiledOutput: string[] = [];
      const sourceFile = this._program.getSourceFile(fileName);
      const emitResult = this._program.emit(
        sourceFile,
        (_fileName: string, data: string, _writeByteOrderMark: boolean) => {
          compiledOutput.push(data);
        },
        undefined,
        undefined,
        {
          before: [
            // hoisting from `ts-jest` or other before transformers
            ...(this.ngJestConfig.customTransformers.before as ts.TransformerFactory<ts.SourceFile>[]),
            /**
             * Downlevel constructor parameters for DI support. This is required to support forwardRef in ES2015 due to
             * TDZ issues. This wrapper is needed here due to the program not being available until after
             * the transformers are created. Also because program can be updated so we can't push this transformer in
             * _createCompilerHost
             */
            downlevelCtor(this._program),
          ],
        },
      );
      if (this.ngJestConfig.shouldReportDiagnostics(fileName)) {
        this._logger.debug({ fileName }, 'getCompiledOutput: getting diagnostics');

        this._allDiagnostics.push(
          ...emitResult.diagnostics,
          ...this._program.getSyntacticDiagnostics(sourceFile),
          ...this._program.getSemanticDiagnostics(sourceFile),
        );
      }
      if (!hasErrors(this._allDiagnostics)) {
        this._logger.debug({ fileName }, 'getCompiledOutput: update compiled output including inline source map');

        return updateOutput(compiledOutput[1], fileName, compiledOutput[0]);
      } else {
        this.ngJestConfig.raiseDiagnostics(this._allDiagnostics as ts.Diagnostic[], fileName);

        return '';
      }
    } else {
      this._logger.debug({ fileName }, 'getCompiledOutput: compiling as isolated module');

      const result: ts.TranspileOutput = this._ts.transpileModule(fileContent, {
        fileName,
        transformers: this.ngJestConfig.customTransformers,
        compilerOptions: this._compilerOptions,
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

      this._createCompilerHost();
      this._createOrUpdateProgram();
    }
  }

  private _createCompilerHost(): void {
    this._logger.debug('_createCompilerHost: creating compiler host using @angular/compiler-cli');

    this._compilerHost = createCompilerHost({
      options: this._compilerOptions,
    });
    this._compilerHost.readFile = (fileName: string): string | undefined => {
      const normalizedFileName = normalize(fileName);
      let fileContent = this._memoryHost.get(normalizedFileName);
      if (!fileContent) {
        fileContent = this._ts.sys.readFile(normalizedFileName, 'utf-8') ?? '';
        this._memoryHost.set(normalizedFileName, fileContent);
      }

      return fileContent;
    };
    this._compilerHost.getSourceFile = (fileName: string, languageVersion: ts.ScriptTarget) => {
      const normalizedFileName = normalize(fileName);
      try {
        const cached = this._sourceFileCache.get(normalizedFileName);
        if (cached) {
          return cached;
        }

        this._logger.debug(
          { normalizedFileName },
          'getSourceFile: cache miss, reading file and create source file to update cache',
        );

        const content = this._compilerHost.readFile(normalizedFileName);
        if (content !== undefined) {
          const sf = this._ts.createSourceFile(normalizedFileName, content, languageVersion, true);
          this._sourceFileCache.set(fileName, sf);

          return sf;
        }
      } catch (e) {
        this._logger.error(e);
      }

      return undefined;
    };
    this._compilerHost.getCurrentDirectory = () => this.ngJestConfig.cwd;
    this._compilerHost.getNewLine = () => LINE_FEED;
    this._compilerHost.getDefaultLibFileName = (options: ts.CompilerOptions) => this._ts.getDefaultLibFilePath(options);
    this._compilerHost.trace = (message: string) => this._logger.trace(message);
  }

  private _createOrUpdateProgram(): void {
    const oldTsProgram = this._program;

    this._logger.debug(`_createOrUpdateProgram: ${oldTsProgram ? 'update' : 'create'} TypeScript Program`);

    this._program = this._ts.createProgram(this._rootNames, this._compilerOptions, this._compilerHost, oldTsProgram);
  }
}
