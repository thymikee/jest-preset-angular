import type { TsJestAstTransformer } from 'ts-jest';
import { TsCompiler } from 'ts-jest/dist/legacy/compiler/ts-compiler';
import { ConfigSet } from 'ts-jest/dist/legacy/config/config-set';
import type * as ts from 'typescript';

import { constructorParametersDownlevelTransform } from '../transformers/downlevel-ctor';
import { replaceResources } from '../transformers/replace-resources';

export class NgJestCompiler extends TsCompiler {
  constructor(readonly configSet: ConfigSet, readonly jestCacheFS: Map<string, string>) {
    super(configSet, jestCacheFS);

    this._logger.debug('created NgJestCompiler');
  }

  /**
   * Copy from https://github.com/microsoft/TypeScript/blob/master/src/services/transpile.ts
   * This is required because the exposed function `transpileModule` from TypeScript doesn't allow to access `Program`
   * and we need `Program` to be able to use Angular `replace-resources` transformer.
   */
  protected _transpileOutput(fileContent: string, fileName: string): ts.TranspileOutput {
    const diagnostics: ts.Diagnostic[] = [];
    const compilerOptions = { ...this._compilerOptions };
    const options: ts.CompilerOptions = compilerOptions
      ? // @ts-expect-error internal TypeScript API
        this._ts.fixupCompilerOptions(compilerOptions, diagnostics)
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
    const inputFileName = fileName || (compilerOptions && compilerOptions.jsx ? 'module.tsx' : 'module.ts');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const sourceFile = this._ts.createSourceFile(inputFileName, fileContent, options.target!); // TODO: GH#18217

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

    this.program = this._ts.createProgram([inputFileName], options, compilerHost);
    if (this.configSet.shouldReportDiagnostics(inputFileName)) {
      // @ts-expect-error internal TypeScript API
      this._ts.addRange(/*to*/ diagnostics, /*from*/ this.program.getSyntacticDiagnostics(sourceFile));
      // @ts-expect-error internal TypeScript API
      this._ts.addRange(/*to*/ diagnostics, /*from*/ this.program.getOptionsDiagnostics());
    }
    // Emit
    this.program.emit(
      /*targetSourceFile*/ undefined,
      /*writeFile*/ undefined,
      /*cancellationToken*/ undefined,
      /*emitOnlyDtsFiles*/ undefined,
      this._makeTransformers(this.configSet.resolvedTransformers),
    );

    // @ts-expect-error internal TypeScript API
    if (outputText === undefined) return this._ts.Debug.fail('Output generation failed');

    return { outputText, diagnostics, sourceMapText };
  }

  protected _makeTransformers(customTransformers: TsJestAstTransformer): ts.CustomTransformers {
    return {
      ...super._makeTransformers(customTransformers).after,
      ...super._makeTransformers(customTransformers).afterDeclarations,
      before: [
        ...customTransformers.before.map((beforeTransformer) =>
          beforeTransformer.factory(this, beforeTransformer.options),
        ),
        replaceResources(this),
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        constructorParametersDownlevelTransform(this.program!),
      ] as Array<ts.TransformerFactory<ts.SourceFile> | ts.CustomTransformerFactory>,
    };
  }
}
