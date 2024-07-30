import os from 'os';
import path from 'path';

import { type TsJestAstTransformer, TsCompiler, type ConfigSet } from 'ts-jest';
import type * as ts from 'typescript';

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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const sourceFile = this._ts.createSourceFile(filePath, fileContent, this._compilerOptions.target!);
        const compilerHost: ts.CompilerHost = {
            getSourceFile: (fileName) => (fileName === path.normalize(filePath) ? sourceFile : undefined),
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            writeFile: () => {},
            getDefaultLibFileName: () => 'lib.d.ts',
            useCaseSensitiveFileNames: () => false,
            getCanonicalFileName: (fileName) => fileName,
            getCurrentDirectory: () => '',
            getNewLine: () => os.EOL,
            fileExists: (fileName): boolean => fileName === filePath,
            readFile: () => '',
            directoryExists: () => true,
            getDirectories: () => [],
        };
        this.program = this._ts.createProgram([filePath], this._compilerOptions, compilerHost);

        return this._ts.transpileModule(fileContent, {
            fileName: filePath,
            transformers: this._makeTransformers(this.configSet.resolvedTransformers),
            compilerOptions: this._compilerOptions,
            reportDiagnostics: this.configSet.shouldReportDiagnostics(filePath),
        });
    }

    protected _makeTransformers(customTransformers: TsJestAstTransformer): ts.CustomTransformers {
        const allTransformers = super._makeTransformers(customTransformers);

        return {
            ...allTransformers.after,
            ...allTransformers.afterDeclarations,
            before: [
                ...(allTransformers.before ?? []),
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                replaceResources(this.program!),
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                angularJitApplicationTransform(this.program!),
            ],
        };
    }
}
