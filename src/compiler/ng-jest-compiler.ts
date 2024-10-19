import os from 'os';
import path from 'path';

import { type TsJestAstTransformer, TsCompiler, type ConfigSet } from 'ts-jest';
import type * as ts from 'typescript';

import { angularJitApplicationTransform } from '../transformers/jit_transform';
import { replaceResources } from '../transformers/replace-resources';

export class NgJestCompiler extends TsCompiler {
    private readonly _defaultLibDirPath: string;
    private readonly _libSourceFileCache = new Map<string, ts.SourceFile>();

    constructor(readonly configSet: ConfigSet, readonly jestCacheFS: Map<string, string>) {
        super(configSet, jestCacheFS);

        this._logger.debug('created NgJestCompiler');
        this._defaultLibDirPath = path.dirname(this._ts.getDefaultLibFilePath(this._compilerOptions));
    }

    /**
     * Copy from https://github.com/microsoft/TypeScript/blob/master/src/services/transpile.ts
     * This is required because the exposed function `transpileModule` from TypeScript doesn't allow to access `Program`
     * and we need `Program` to be able to use Angular AST transformers.
     */
    protected _transpileOutput(fileContent: string, filePath: string): ts.TranspileOutput {
        const scriptTarget = this._compilerOptions.target ?? this._ts.ScriptTarget.Latest;
        const sourceFile = this._ts.createSourceFile(filePath, fileContent, scriptTarget);
        const compilerHost: ts.CompilerHost = {
            getSourceFile: (fileName) => {
                if (fileName === path.normalize(filePath)) {
                    return sourceFile;
                }

                let libSourceFile = this._libSourceFileCache.get(fileName);
                if (!libSourceFile) {
                    const libFilePath = path.join(this._defaultLibDirPath, fileName);
                    const libFileContent = this._ts.sys.readFile(libFilePath) ?? '';
                    if (libFileContent) {
                        libSourceFile = this._ts.createSourceFile(fileName, libFileContent, scriptTarget);
                        this._libSourceFileCache.set(fileName, libSourceFile);
                    }
                }

                return libSourceFile;
            },
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            writeFile: () => {},
            getDefaultLibFileName: () => 'lib.d.ts',
            useCaseSensitiveFileNames: () => false,
            getCanonicalFileName: (fileName) => fileName,
            getCurrentDirectory: () => '',
            getNewLine: () => os.EOL,
            fileExists: (fileName) => fileName === filePath,
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
