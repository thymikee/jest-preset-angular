import type { TransformedSource, Transformer, TransformOptions } from '@jest/transform';
import type { Config } from '@jest/types';
import { stringify } from 'ts-jest/dist/utils/json';
import { JsonableValue } from 'ts-jest/dist/utils/jsonable-value';
import { TsJestTransformer } from 'ts-jest/dist/ts-jest-transformer';

import { NgJestConfig } from './config/ng-jest-config';

interface CachedConfigSet {
  ngJestConfig: NgJestConfig;
  jestConfig: JsonableValue<Config.ProjectConfig>;
  transformerCfgStr: string;
}

class NgJestTransformer extends TsJestTransformer implements Transformer {
  /**
   * cache config set between each test run
   */
  private static readonly _cachedConfigSets: CachedConfigSet[] = [];
  // @ts-expect-error Temporarily use ts-expect-error because we will use this later
  private _ngJestConfig!: NgJestConfig;

  process(
    input: string,
    filePath: Config.Path,
    jestConfig: Config.ProjectConfig,
    transformOptions?: TransformOptions,
  ): TransformedSource | string {
    return super.process(input, filePath, jestConfig, transformOptions);
  }

  /**
   * Override `ts-jest` method to load our `NgJestConfig` class
   */
  configsFor(jestConfig: Config.ProjectConfig): NgJestConfig {
    const ccs: CachedConfigSet | undefined = NgJestTransformer._cachedConfigSets.find(
      (cs) => cs.jestConfig.value === jestConfig,
    );
    let ngJestConfig: NgJestConfig;
    if (ccs) {
      this._transformCfgStr = ccs.transformerCfgStr;
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
        serializedCcs.jestConfig.value = jestConfig;
        this._transformCfgStr = serializedCcs.transformerCfgStr;
        ngJestConfig = serializedCcs.ngJestConfig;
      } else {
        // create the new record in the index
        this.logger.info('no matching config-set found, creating a new one');

        ngJestConfig = new NgJestConfig(jestConfig);
        this._transformCfgStr = new JsonableValue({
          ...jestConfig,
          ...ngJestConfig.parsedTsConfig,
        }).serialized;
        NgJestTransformer._cachedConfigSets.push({
          jestConfig: new JsonableValue(jestConfig),
          ngJestConfig,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          transformerCfgStr: this._transformCfgStr,
        });
      }
    }

    return ngJestConfig;
  }
}

export = new NgJestTransformer();
