import { TsJestTransformer } from 'ts-jest/dist/ts-jest-transformer';
import type { TransformOptionsTsJest, ProjectConfigTsJest } from 'ts-jest/dist/types';
import { stringify } from 'ts-jest/dist/utils/json';
import { JsonableValue } from 'ts-jest/dist/utils/jsonable-value';

import { NgJestCompiler } from './compiler/ng-jest-compiler';
import { NgJestConfig } from './config/ng-jest-config';

interface CachedConfigSet {
  ngJestConfig: NgJestConfig;
  jestConfig: JsonableValue<ProjectConfigTsJest>;
  transformerCfgStr: string;
  ngJestCompiler: NgJestCompiler;
}

export class NgJestTransformer extends TsJestTransformer {
  /**
   * cache config set between each test run
   */
  private static readonly _cachedConfigSets: CachedConfigSet[] = [];
  protected _compiler!: NgJestCompiler;

  /**
   * Override `ts-jest` method to load our `NgJestConfig` class
   */
  protected _configsFor(transformOptions: TransformOptionsTsJest): NgJestConfig {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const jestConfig = { ...transformOptions.config };
    const ccs: CachedConfigSet | undefined = NgJestTransformer._cachedConfigSets.find(
      (cs) => cs.jestConfig.value === jestConfig,
    );
    let ngJestConfig: NgJestConfig;
    if (ccs) {
      this._transformCfgStr = ccs.transformerCfgStr;
      this._compiler = ccs.ngJestCompiler;
      ngJestConfig = ccs.ngJestConfig;
    } else {
      // try to look-it up by stringified version
      const stringifiedJestCfg = stringify(jestConfig);
      const serializedCcs = NgJestTransformer._cachedConfigSets.find(
        (cs) => cs.jestConfig.serialized === stringifiedJestCfg,
      );
      if (serializedCcs) {
        // update the object so that we can find it later
        // this happens because jest first calls getCacheKey with stringified version of
        // the config, and then it calls the transformer with the proper object
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        serializedCcs.jestConfig.value = jestConfig;
        this._transformCfgStr = serializedCcs.transformerCfgStr;
        this._compiler = serializedCcs.ngJestCompiler;
        ngJestConfig = serializedCcs.ngJestConfig;
      } else {
        // create the new record in the index
        this._logger.info('no matching config-set found, creating a new one');

        ngJestConfig = new NgJestConfig(jestConfig);
        this._compiler = new NgJestCompiler(ngJestConfig, transformOptions.cacheFS);
        this._transformCfgStr = new JsonableValue({
          ...jestConfig,
          ...ngJestConfig.parsedTsConfig,
        }).serialized;
        NgJestTransformer._cachedConfigSets.push({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          jestConfig: new JsonableValue(jestConfig),
          ngJestConfig,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          transformerCfgStr: this._transformCfgStr,
          ngJestCompiler: this._compiler,
        });
        this._getFsCachedResolvedModules(ngJestConfig);
      }
    }

    return ngJestConfig;
  }
}
