import os from 'node:os';
import path from 'node:path';

import { type TsJestAstTransformer, TsCompiler, type ConfigSet } from 'ts-jest';
import ts from 'typescript';

import { angularJitApplicationTransform } from '../transformers/jit_transform';
import { replaceResources } from '../transformers/replace-resources';

export class NgJestCompiler extends TsCompiler {
    constructor(
        readonly configSet: ConfigSet,
        readonly jestCacheFS: Map<string, string>,
    ) {
        super(configSet, jestCacheFS);

        if (!configSet.isolatedModules && this._isAngularExportsOnly()) {
            this._patchModuleResolution();
        }

        this._logger.debug('created NgJestCompiler');
    }

    /**
     * Patches `fixupCompilerOptionsForModuleKind` on this instance so that the
     * LanguageService always uses an Angular-compatible moduleResolution.
     *
     * ts-jest's `fixupCompilerOptionsForModuleKind` always overwrites moduleResolution
     * to NodeJs (2), which prevents resolving Angular 21+ packages via `exports` fields.
     * Since the LanguageService host reads `this._compilerOptions` on every emit call,
     * patching this method before any compilation ensures the correct value is used.
     */
    private _patchModuleResolution(): void {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const self = this as any;

        if (typeof self.fixupCompilerOptionsForModuleKind !== 'function') {
            this._logger.warn(
                'fixupCompilerOptionsForModuleKind not found on TsCompiler - moduleResolution patch skipped. ' +
                    'This may cause module resolution errors with Angular 21+ packages. ' +
                    'See https://github.com/thymikee/jest-preset-angular/issues/3529',
            );

            return;
        }

        const original = self.fixupCompilerOptionsForModuleKind.bind(self) as (
            opts: ts.CompilerOptions,
            isEsm: boolean,
        ) => ts.CompilerOptions;
        const ngModuleResolution = this._computeNgModuleResolution();

        self.fixupCompilerOptionsForModuleKind = (opts: ts.CompilerOptions, isEsm: boolean): ts.CompilerOptions => ({
            ...original(opts, isEsm),
            moduleResolution: ngModuleResolution,
        });
    }

    /**
     * Returns the moduleResolution kind to use for Angular.
     * Upgrades legacy (Classic=1, NodeJs/Node10=2) to Bundler;
     * preserves modern values (Node16=3, NodeNext=99, Bundler=100).
     */
    private _computeNgModuleResolution(): ts.ModuleResolutionKind {
        const userModuleResolution = this._initialCompilerOptions.moduleResolution;
        const legacyThreshold = this._ts.ModuleResolutionKind.Node10;

        return !userModuleResolution || userModuleResolution <= legacyThreshold
            ? this._ts.ModuleResolutionKind.Bundler
            : userModuleResolution;
    }

    private _isAngularExportsOnly(): boolean {
        const { resolvedModule } = this._ts.resolveModuleName(
            '@angular/core',
            path.join(this.configSet.cwd, 'index.ts'),
            { moduleResolution: this._ts.ModuleResolutionKind.Node10 },
            this._ts.sys,
        );

        return !resolvedModule;
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
