import type { CacheKeyOptions, TransformedSource, Transformer, TransformOptions } from '@jest/transform';
import type { Config } from '@jest/types';
import { TsJestTransformer } from 'ts-jest/dist/ts-jest-transformer';
import createCacheKey from '@jest/create-cache-key-function';

import { NgJestConfig } from './config/ng-jest-config';
import { stringify } from './utils/json';
import { JsonableValue } from './utils/jsonable-value';

import { NgJestCompiler } from './compiler/ng-jest-compiler';

interface ConfigSetItem {
  configSet: NgJestConfig;
  jestConfig: JsonableValue<Config.ProjectConfig>;
}

class AngularJestTransformer extends TsJestTransformer implements Transformer {
  /**
   * @internal
   * cache config set between each test run
   */
  private static readonly configSetItems: ConfigSetItem[] = [];
  private _compiler!: NgJestCompiler;

  /**
   * Override `ts-jest` configsFor to initialize our `NgJestConfig`
   * @internal
   */
  configsFor(jestConfig: Config.ProjectConfig): NgJestConfig {
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
    const configSet = new NgJestConfig(jestConfig);
    AngularJestTransformer.configSetItems.push({
      jestConfig: new JsonableValue(jestConfig),
      configSet,
    });
    this._compiler = new NgJestCompiler(configSet);

    return configSet;
  }

  process(
    _fileContent: string,
    filePath: Config.Path,
    _jestConfig: Config.ProjectConfig,
    _transformOptions?: TransformOptions,
  ): TransformedSource | string {
    return this._compiler.getCompiledFile(filePath);
  }

  getCacheKey(
    fileContent: string,
    filePath: string,
    _jestConfigStr: string,
    transformOptions: CacheKeyOptions,
  ): string {
    const configs = this.configsFor(transformOptions.config);

    return createCacheKey()(fileContent, filePath, configs.ngJestConfigStr, {
      config: transformOptions.config,
      instrument: false,
    });
  }
}

export = new AngularJestTransformer();
