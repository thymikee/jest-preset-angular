import { createHash } from 'node:crypto';

import type { TransformedSource } from '@jest/transform';
import { LogContexts, LogLevels, type Logger, createLogger } from 'bs-logger';
import { transformSync } from 'esbuild';
import { type TsJestTransformerOptions, ConfigSet, TsJestTransformer, type TsJestTransformOptions } from 'ts-jest';
import { updateOutput } from 'ts-jest/dist/legacy/compiler/compiler-utils';
import type { TranspileOutput } from 'typescript';

import { NgJestCompiler } from './compiler/ng-jest-compiler';
import { NgJestConfig } from './config/ng-jest-config';

// stores hashes made out of only one argument being a string
const cache: Record<string, string> = {};

type DataItem = string | Buffer;

const sha1 = (...data: DataItem[]): string => {
    const canCache = data.length === 1 && typeof data[0] === 'string';
    // caching
    let cacheKey!: string;
    if (canCache) {
        cacheKey = data[0] as string;
        if (cacheKey in cache) {
            return cache[cacheKey];
        }
    }

    // we use SHA1 because it's the fastest provided by node
    // and we are not concerned about security here
    const hash = createHash('sha1');
    data.forEach((item) => {
        if (typeof item === 'string') {
            hash.update(item, 'utf8');
        } else {
            hash.update(item);
        }
    });
    const res = hash.digest('hex').toString();

    if (canCache) {
        cache[cacheKey] = res;
    }

    return res;
};

export class NgJestTransformer extends TsJestTransformer {
    readonly #ngJestLogger: Logger;

    constructor(tsJestConfig?: TsJestTransformerOptions) {
        super(tsJestConfig);
        this.#ngJestLogger = createLogger({
            context: {
                [LogContexts.package]: 'jest-preset-angular',
                [LogContexts.logLevel]: LogLevels.trace,
                version: this.version,
            },
            targets: process.env.NG_JEST_LOG ?? undefined,
        });
    }

    protected _createConfigSet(config: TsJestTransformOptions['config'] | undefined): ConfigSet {
        return new NgJestConfig(config);
    }

    protected _createCompiler(configSet: ConfigSet, cacheFS: Map<string, string>): void {
        this._compiler = new NgJestCompiler(configSet, cacheFS);
    }

    private get version(): string {
        return require('../package.json').version;
    }

    process(fileContent: string, filePath: string, transformOptions: TsJestTransformOptions): TransformedSource {
        // @ts-expect-error we are accessing the private cache to avoid creating new objects all the time
        const configSet = super._configsFor(transformOptions);
        if (configSet.processWithEsbuild(filePath)) {
            this.#ngJestLogger.debug({ filePath }, 'process with esbuild');

            const compilerOpts = configSet.parsedTsConfig.options;
            const { code, map } = transformSync(fileContent, {
                loader: 'js',
                format: transformOptions.supportsStaticESM && configSet.useESM ? 'esm' : 'cjs',
                target: compilerOpts.target === configSet.compilerModule.ScriptTarget.ES2015 ? 'es2015' : 'es2016',
                sourcemap: compilerOpts.sourceMap,
                sourcefile: filePath,
                sourcesContent: true,
                sourceRoot: compilerOpts.sourceRoot,
            });

            return {
                code,
                map,
            };
        } else {
            if (filePath.includes('node_modules') && filePath.endsWith('.js')) {
                /**
                 * Simply transform the file without applying any extra AST transformers. We might consider to support using AST transformers on `node_modules` files when there are requests.
                 * Since the files in `node_modules` are prebuilt, we don't need to perform type check on these files which should benefit the performance.
                 */
                const result: TranspileOutput = configSet.compilerModule.transpileModule(fileContent, {
                    compilerOptions: {
                        ...configSet.parsedTsConfig.options,
                        module:
                            transformOptions.supportsStaticESM && configSet.useESM
                                ? configSet.parsedTsConfig.options.module
                                : configSet.compilerModule.ModuleKind.CommonJS,
                    },
                    fileName: filePath,
                });

                return {
                    code: updateOutput(result.outputText, filePath, result.sourceMapText),
                };
            }

            return super.process(fileContent, filePath, transformOptions);
        }
    }

    getCacheKey(fileContent: string, filePath: string, transformOptions: TsJestTransformOptions): string {
        return sha1(super.getCacheKey(fileContent, filePath, transformOptions), this.version);
    }
}
