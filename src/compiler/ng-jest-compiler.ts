import os from 'node:os';
import path from 'node:path';

import { type TsJestAstTransformer, TsCompiler, type ConfigSet } from 'ts-jest';
import ts from 'typescript';

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
              ts.fixupCompilerOptions(compilerOptions, diagnostics)
            : {};

        // mix in default options
        const defaultOptions = ts.getDefaultCompilerOptions();
        for (const key in defaultOptions) {
            if (Object.prototype.hasOwnProperty.call(defaultOptions, key) && options[key] === undefined) {
                options[key] = defaultOptions[key];
            }
        }

        // @ts-expect-error internal TypeScript API
        for (const option of ts.transpileOptionValueCompilerOptions) {
            options[option.name] = option.transpileOptionValue;
        }

        if (options.isolatedModules && options.emitDecoratorMetadata) {
            this._logger.warn(`
                TypeScript compiler option 'isolatedModules' may prevent the 'emitDecoratorMetadata' option from emitting all metadata.
                The 'emitDecoratorMetadata' option is not required by Angular and can be removed if not explicitly required by the project.'
            `);
        }

        /**
         * transpileModule does not write anything to disk so there is no need to verify that there are no conflicts between
         * input and output paths.
         */
        options.suppressOutputPathCheck = true;

        // Filename can be non-ts file.
        options.allowNonTsExtensions = true;

        const sourceFile = ts.createSourceFile(filePath, fileContent, options.target ?? ts.ScriptTarget.Latest);

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

        this.program = ts.createProgram([filePath], options, compilerHost);
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
        const transformerFactories = super._makeTransformers(customTransformers);

        return {
            ...transformerFactories.after,
            ...transformerFactories.afterDeclarations,
            before: [
                ...(transformerFactories.before ?? []),
                replaceResources(program),
                angularJitApplicationTransform(program),
            ],
        };
    }
}
