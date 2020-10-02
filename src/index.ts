import type { TransformedSource, Transformer, TransformOptions } from '@jest/transform';
import type { Config } from '@jest/types';
import type { ConfigSet } from 'ts-jest/dist/config/config-set';
import { TsJestTransformer } from 'ts-jest/dist/ts-jest-transformer';

import { NgJestConfig } from './config/ng-jest-config';
import { JsonableValue } from './utils/jsonable-value';
import { stringify } from './utils/json';

interface ConfigSetItem {
  configSet: ConfigSet;
  jestConfig: JsonableValue<Config.ProjectConfig>;
}

class AngularJestTransformer extends TsJestTransformer implements Transformer {
  /**
   * cache config within a process
   */
  private static readonly configSetItems: ConfigSetItem[] = [];

  /**
   * Copy from `ts-jest` and replace with NgJestConfig
   */
  configsFor(jestConfig: Config.ProjectConfig): ConfigSet {
    let csi: ConfigSetItem | undefined = AngularJestTransformer.configSetItems.find(
      (cs) => cs.jestConfig.value === jestConfig,
    );
    if (csi) return csi.configSet;
    // try to look-it up by stringified version
    const serialized = stringify(jestConfig);
    csi = AngularJestTransformer.configSetItems.find((cs) => cs.jestConfig.serialized === serialized);
    if (csi) {
      // update the object so that we can find it later
      // this happens because jest first calls getCacheKey with stringified version of
      // the config, and then it calls the transformer with the proper object
      csi.jestConfig.value = jestConfig;

      return csi.configSet;
    }
    const jestConfigObj: Config.ProjectConfig = jestConfig;

    const configSet = new NgJestConfig(jestConfigObj);
    AngularJestTransformer.configSetItems.push({
      jestConfig: new JsonableValue(jestConfigObj),
      configSet,
    });

    return configSet;
  }

  process(
    input: string,
    filePath: Config.Path,
    jestConfig: Config.ProjectConfig,
    transformOptions?: TransformOptions,
  ): TransformedSource | string {
    return super.process(input, filePath, jestConfig, transformOptions);
  }
}

export = new AngularJestTransformer();
