import {
  CompilerHost,
  CompilerOptions,
  constructorParametersDownlevelTransform,
  createCompilerHost,
  Diagnostic,
  readConfiguration,
} from '@angular/compiler-cli';
import { DiagnosticMode, hasErrors, reportDiagnostics } from '@ngtools/webpack/src/diagnostics';
import * as ts from 'typescript';

import type { NgJestConfig } from '../config/ng-jest-config';
import { factory as inlineFiles } from '../transformers/inline-files';
import { factory as stripStyles } from '../transformers/strip-styles';
import { gatherDiagnostics } from './diagnostics';
import { TSError } from '../utils/ts-error';

/**
 * @internal
 */
export const SOURCE_MAPPING_PREFIX = 'sourceMappingURL=';

/**
 * Update the output remapping the source map.
 * Copy from `ts-jest`
 */
function updateOutput(outputText: string, normalizedFileName: string, sourceMap: string): string {
  const base64Map = Buffer.from(updateSourceMap(sourceMap, normalizedFileName), 'utf8').toString('base64');
  const sourceMapContent = `data:application/json;charset=utf-8;base64,${base64Map}`;

  // sourceMappingURL= prefix is always at the end of compiledOutput, using lastIndexOf should be the safest way to substring
  return (
    outputText.slice(0, outputText.lastIndexOf(SOURCE_MAPPING_PREFIX) + SOURCE_MAPPING_PREFIX.length) + sourceMapContent
  );
}

/**
 * Update the source map contents for improved output.
 * Copy from `ts-jest`
 */
function updateSourceMap(sourceMapText: string, normalizedFileName: string): string {
  const sourceMap = JSON.parse(sourceMapText) as Record<string, unknown>;
  sourceMap.file = normalizedFileName;
  sourceMap.sources = [normalizedFileName];
  delete sourceMap.sourceRoot;

  return JSON.stringify(sourceMap);
}

export class NgJestCompiler {
  private _compilerOptions!: CompilerOptions;
  private _program: ts.Program | undefined;
  private _transformers: ts.TransformerFactory<ts.SourceFile>[] = [];
  private _compilerHost!: CompilerHost;
  private _rootNames: string[] = [];
  private _tsConfigPath!: string;
  private _allDiagnostics: Array<ts.Diagnostic | Diagnostic> = [];
  private _warnings: string[] = [];
  private _errors: string[] = [];

  constructor(private configSet: NgJestConfig) {
    this._setupOptions(this.configSet);
  }

  getCompiledFile(fileName: string): string | undefined {
    this._createOrUpdateProgram(false);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this._allDiagnostics.push(...gatherDiagnostics(this._program!, DiagnosticMode.Semantic));
    if (!hasErrors(this._allDiagnostics)) {
      const emitResult: string[] = [];
      // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
      const sourceFile = this._program!.getSourceFile(fileName);
      // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
      this._program!.emit(
        sourceFile,
        (_fileName: string, data: string, _writeByteOrderMark: boolean) => {
          emitResult.push(data);
        },
        undefined,
        undefined,
        { before: this._transformers },
      );

      return updateOutput(emitResult[1], fileName, emitResult[0]);
    } else {
      this._raiseDiagnostics();

      return;
    }
  }

  private _setupOptions({ parsedTsConfig }: NgJestConfig) {
    this._compilerOptions = { ...parsedTsConfig.options };
    this._tsConfigPath = this._compilerOptions.configFilePath as string;

    this._rootNames = parsedTsConfig.rootNames;
    // Normally an Angular project usually sets to true to optimize bundle size but we just make sure it always sets
    this._compilerOptions.importHelpers = true;
    // Overwrite outDir so we can find generated files next to their .ts origin in compilerHost.
    this._compilerOptions.outDir = '';
    this._compilerOptions.suppressOutputPathCheck = true;
    this._compilerOptions.sourceMap = true;
    this._compilerOptions.inlineSources = true;
    this._compilerOptions.inlineSourceMap = false;
    this._compilerOptions.mapRoot = undefined;
    // For performance, disable AOT decorator downleveling transformer for applications in the CLI.
    // The transformer is not needed for VE or Ivy in this plugin since Angular decorators are removed.
    // While the transformer would make no changes, it would still need to walk each source file AST.
    this._compilerOptions.annotationsAs = 'decorators' as const;
    if (this._compilerOptions.strictMetadataEmit) {
      console.warn(
        `Using Angular compiler option 'strictMetadataEmit' for applications might cause undefined behavior.`,
      );
    }
    this._compilerHost = createCompilerHost({
      options: this._compilerOptions,
    });
    this._createOrUpdateProgram(true);
    // Make transformers only after creating Program
    this._makeTransformers();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this._allDiagnostics.push(...this._program!.getOptionsDiagnostics());
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this._allDiagnostics.push(...gatherDiagnostics(this._program!, DiagnosticMode.All));
    this._raiseDiagnostics();
  }

  private _createOrUpdateProgram(isInitialized: boolean): void {
    // Get the root files from the ts config.
    // When a new root name (like a lazy route) is added, it won't be available from
    // following imports on the existing files, so we need to get the new list of root files.
    if (!isInitialized) {
      const config = readConfiguration(this._tsConfigPath);
      this._rootNames = config.rootNames;
    }
    const oldTsProgram = this._program;
    this._program = ts.createProgram(this._rootNames, this._compilerOptions, this._compilerHost, oldTsProgram);
  }

  private _makeTransformers(): void {
    // Replace resources in JIT.
    this._transformers.push(inlineFiles(this.configSet));
    this._transformers.push(stripStyles(this.configSet));
    // Downlevel constructor parameters for DI support
    // This is required to support forwardRef in ES2015 due to TDZ issues
    // This wrapper is needed here due to the program not being available until after the transformers are created.
    const downlevelFactory: ts.TransformerFactory<ts.SourceFile> = (context) => {
      const factory = constructorParametersDownlevelTransform(this._program as ts.Program);

      return factory(context);
    };
    this._transformers.push(downlevelFactory);
  }

  private _createTsError(diagnostics: Array<ts.Diagnostic | Diagnostic>): TSError {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const diagnosticText = this.configSet.compilerModule.formatDiagnosticsWithColorAndContext(diagnostics as any[], {
      getNewLine: () => '\n',
      // @ts-expect-error `ts-jest` doesn't expose this as public typing
      getCurrentDirectory: () => this.configSet.cwd, // eslint-disable-line
      getCanonicalFileName: (path: string) => path,
    });

    return new TSError(diagnosticText);
  }

  private _raiseDiagnostics(): void {
    if (hasErrors(this._allDiagnostics)) {
      reportDiagnostics(
        this._allDiagnostics,
        (msg) => this._errors.push(msg),
        (msg) => this._warnings.push(msg),
      );
      if (this._errors.length) {
        throw this._createTsError(this._allDiagnostics);
      }
      if (this._warnings.length) {
        console.warn(this._createTsError(this._allDiagnostics));
      }
      this._errors = [];
      this._warnings = [];
    }
  }
}
