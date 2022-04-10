import { spawnSync } from 'child_process';
import path from 'path';

import type { TransformedSource } from '@jest/transform';
import { LogContexts, LogLevels, Logger, createLogger } from 'bs-logger';
import { ConfigSet } from 'ts-jest/dist/config/config-set';
import { TsJestTransformer } from 'ts-jest/dist/ts-jest-transformer';
import type { ProjectConfigTsJest, TransformOptionsTsJest } from 'ts-jest/dist/types';

import { NgJestCompiler } from './compiler/ng-jest-compiler';
import { NgJestConfig } from './config/ng-jest-config';

// Cache the result between multiple transformer instances
// to avoid spawning multiple processes (which can have a major
// performance impact when used with multiple projects).
let useNativeEsbuild: boolean | undefined;

export class NgJestTransformer extends TsJestTransformer {
  #ngJestLogger: Logger;
  #esbuildImpl: typeof import('esbuild');

  constructor() {
    super();
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
        const esbuildCheckPath = require.resolve('@angular-devkit/build-angular/esbuild-check.js');
        const { status, error } = spawnSync(process.execPath, [esbuildCheckPath]);
        useNativeEsbuild = status === 0 && error === undefined;
      } catch (e) {
        useNativeEsbuild = false;
      }
    }

    this.#esbuildImpl = useNativeEsbuild ? require('esbuild') : require('esbuild-wasm');
  }

  protected _createConfigSet(config: ProjectConfigTsJest | undefined): ConfigSet {
    return new NgJestConfig(config);
  }

  protected _createCompiler(configSet: ConfigSet, cacheFS: Map<string, string>): void {
    this._compiler = new NgJestCompiler(configSet, cacheFS);
  }

  process(fileContent: string, filePath: string, transformOptions: TransformOptionsTsJest): TransformedSource | string {
    // @ts-expect-error we are accessing the private cache to avoid creating new objects all the time
    const configSet = super._configsFor(transformOptions);
    /**
     * TypeScript < 4.5 doesn't support compiling `.mjs` file by default when running `tsc` which throws error. Also we
     * transform `js` files from `node_modules` assuming that `node_modules` contains compiled files to speed up compilation.
     * IMPORTANT: we exclude `tslib` from compilation because it has issue with compilation. The original `tslib.js` or
     * `tslib.es6.js` works well with Jest without extra compilation
     */
    if (
      path.extname(filePath) === '.mjs' ||
      (/node_modules\/(.*.js$)/.test(filePath.replace(/\\/g, '/')) && !filePath.includes('tslib'))
    ) {
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
