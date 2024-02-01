import type { TransformedSource } from '@jest/transform';
import { LogContexts, LogLevels, type Logger, createLogger } from 'bs-logger';
import { transformSync } from 'esbuild';
import { type TsJestTransformerOptions, ConfigSet, TsJestTransformer, type TsJestTransformOptions } from 'ts-jest';

import { NgJestCompiler } from './compiler/ng-jest-compiler';
import { NgJestConfig } from './config/ng-jest-config';

export class NgJestTransformer extends TsJestTransformer {
  #ngJestLogger: Logger;

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
