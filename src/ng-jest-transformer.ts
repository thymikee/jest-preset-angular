import { spawnSync } from 'child_process';

import type { TransformedSource } from '@jest/transform';
import { LogContexts, LogLevels, type Logger, createLogger } from 'bs-logger';
import { type TsJestTransformerOptions, ConfigSet, TsJestTransformer, type TsJestTransformOptions } from 'ts-jest';

import { NgJestCompiler } from './compiler/ng-jest-compiler';
import { NgJestConfig } from './config/ng-jest-config';

// Cache the result between multiple transformer instances
// to avoid spawning multiple processes (which can have a major
// performance impact when used with multiple projects).
let useNativeEsbuild: boolean | undefined;

export class NgJestTransformer extends TsJestTransformer {
  #ngJestLogger: Logger;
  #esbuildImpl: typeof import('esbuild');

  constructor(tsJestConfig?: TsJestTransformerOptions) {
    super(tsJestConfig);
    this.#ngJestLogger = createLogger({
      context: {
        [LogContexts.package]: 'jest-preset-angular',
        [LogContexts.logLevel]: LogLevels.trace,
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        version: require('../package.json').version,
      },
      targets: process.env.NG_JEST_LOG ?? undefined,
    });

    if (useNativeEsbuild === undefined) {
      try {
        const esbuildCheckPath = require.resolve('../esbuild-check.js');
        const { status, error } = spawnSync(process.execPath, [esbuildCheckPath]);
        useNativeEsbuild = status === 0 && error === undefined;
      } catch (e) {
        useNativeEsbuild = false;
      }
    }

    this.#esbuildImpl = useNativeEsbuild ? require('esbuild') : require('esbuild-wasm');
  }

  protected _createConfigSet(config: TsJestTransformOptions['config'] | undefined): ConfigSet {
    return new NgJestConfig(config);
  }

  protected _createCompiler(configSet: ConfigSet, cacheFS: Map<string, string>): void {
    this._compiler = new NgJestCompiler(configSet, cacheFS);
  }

  process(fileContent: string, filePath: string, transformOptions: TsJestTransformOptions): TransformedSource {
    // @ts-expect-error we are accessing the private cache to avoid creating new objects all the time
    const configSet = super._configsFor(transformOptions);
    if (configSet.processWithEsbuild(filePath)) {
      this.#ngJestLogger.debug({ filePath }, 'process with esbuild');

      const compilerOpts = configSet.parsedTsConfig.options;
      const { code, map } = this.#esbuildImpl.transformSync(fileContent, {
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
      return super.process(fileContent, filePath, transformOptions);
    }
  }
}
