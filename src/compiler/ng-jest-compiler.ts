import os from 'node:os';
import path from 'node:path';

import { type TsJestAstTransformer, TsCompiler, type ConfigSet } from 'ts-jest';
import type ts from 'typescript';

import { angularJitApplicationTransform } from '../transformers/jit_transform';
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
    protected _transpileOutput(fileContent: string, filePath: string): ts.TranspileOutput {
        const diagnostics: ts.Diagnostic[] = [];
        const compilerOptions = { ...this._compilerOptions };
        const options: ts.CompilerOptions = compilerOptions
            ? // @ts-expect-error internal TypeScript API
              this._ts.fixupCompilerOptions(compilerOptions, diagnostics)
            : {};

        // mix in default options
        const defaultOptions = this._ts.getDefaultCompilerOptions();
        for (const key in defaultOptions) {
            if (Object.prototype.hasOwnProperty.call(defaultOptions, key) && options[key] === undefined) {
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

        const sourceFile = this._ts.createSourceFile(
            filePath,
            fileContent,
            options.target ?? this._ts.ScriptTarget.Latest,
        );

        let outputText: string | undefined;
        let sourceMapText: string | undefined;

        const compilerHost: ts.CompilerHost = {
            getSourceFile: (fileName) => {
                return path.normalize(fileName) === path.normalize(filePath) ? sourceFile : undefined;
            },
            writeFile: (name, text) => {
                if (path.extname(name) === '.map') {
                    sourceMapText = text;
                } else {
                    outputText = text;
                }
            },
            getDefaultLibFileName: () => 'lib.d.ts',
            useCaseSensitiveFileNames: () => false,
            getCanonicalFileName: (fileName) => fileName,
            getCurrentDirectory: () => '',
            getNewLine: () => os.EOL,
            fileExists: (fileName) => {
                return path.normalize(fileName) === path.normalize(filePath);
            },
            readFile: () => '',
            directoryExists: () => true,
            getDirectories: () => [],
        };

        this.program = this._ts.createProgram([filePath], options, compilerHost);
        this.program.emit(
            undefined,
            undefined,
            undefined,
            undefined,
            this._makeTransformers(this.configSet.resolvedTransformers),
        );

        return { outputText: outputText ?? '', diagnostics, sourceMapText };
    }

    protected _makeTransformers(customTransformers: TsJestAstTransformer): ts.CustomTransformers {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const program = this.program!;

        return {
            ...super._makeTransformers(customTransformers).after,
            ...super._makeTransformers(customTransformers).afterDeclarations,
            before: [
                ...customTransformers.before.map((beforeTransformer) =>
                    beforeTransformer.factory(this, beforeTransformer.options),
                ),
                replaceResources(program),
                angularJitApplicationTransform(program),
            ] as Array<ts.TransformerFactory<ts.SourceFile> | ts.CustomTransformerFactory>,
        };
    }
}
