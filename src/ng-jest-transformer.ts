import path from 'path';

import type { TransformedSource } from '@jest/transform';
import type { Config } from '@jest/types';
import { LogContexts, LogLevels, Logger, createLogger } from 'bs-logger';
import { transformSync } from 'esbuild';
import { ConfigSet } from 'ts-jest/dist/config/config-set';
import { TsJestTransformer } from 'ts-jest/dist/ts-jest-transformer';
import type { ProjectConfigTsJest, TransformOptionsTsJest } from 'ts-jest/dist/types';

import { NgJestCompiler } from './compiler/ng-jest-compiler';
import { NgJestConfig } from './config/ng-jest-config';

export class NgJestTransformer extends TsJestTransformer {
  #ngJestLogger: Logger;

  constructor() {
    super();
    this.#ngJestLogger = createLogger({
      context: {
        [LogContexts.package]: 'ts-jest',
        [LogContexts.logLevel]: LogLevels.trace,
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        version: require('../package.json').version,
      },
      targets: process.env.NG_JEST_LOG ?? undefined,
    });
  }

  protected _createConfigSet(config: ProjectConfigTsJest | undefined): ConfigSet {
    return new NgJestConfig(config);
  }

  protected _createCompiler(configSet: ConfigSet, cacheFS: Map<string, string>): void {
    this._compiler = new NgJestCompiler(configSet, cacheFS);
  }

  process(
    fileContent: string,
    filePath: Config.Path,
    transformOptions: TransformOptionsTsJest,
  ): TransformedSource | string {
    const configSet = this._createConfigSet(transformOptions.config);
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
      return super.process(fileContent, filePath, transformOptions);
    }
  }
}
