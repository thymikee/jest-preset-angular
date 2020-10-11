import type { ParsedConfiguration } from '@angular/compiler-cli';
import type { CacheKeyOptions, TransformedSource, Transformer, TransformOptions } from '@jest/transform';
import type { Config } from '@jest/types';
import createCacheKey from '@jest/create-cache-key-function';
import { TsJestTransformer } from 'ts-jest/dist/ts-jest-transformer';

import { NgJestConfig } from './config/ng-jest-config';
import { JsonObject } from './utils/json-object';
import { stringify } from './utils/json';

interface CachedConfigSet {
  ngJestConfig: NgJestConfig;
  jestConfig: JsonObject<Config.ProjectConfig>;
  transformerConfig: JsonObject<Config.ProjectConfig & ParsedConfiguration>;
}

class AngularJestTransformer extends TsJestTransformer implements Transformer {
  /**
   * cache config set between each test run
   */
  private static readonly _cachedConfigSets: CachedConfigSet[] = [];
  private _transformerCfgStr!: string;
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

  getCacheKey(
    fileContent: string,
    filePath: string,
    _jestConfigStr: string,
    transformOptions: CacheKeyOptions,
  ): string {
    this.createOrResolveTransformerCfg(transformOptions.config);

    return createCacheKey()(fileContent, filePath, this._transformerCfgStr, {
      config: transformOptions.config,
      instrument: false,
    });
  }

  private createOrResolveTransformerCfg(jestConfig: Config.ProjectConfig): void {
    const ccs: CachedConfigSet | undefined = AngularJestTransformer._cachedConfigSets.find(
      (cs) => cs.jestConfig.value === jestConfig,
    );
    if (ccs) {
      this._transformerCfgStr = ccs.transformerConfig.serialized;
      this._ngJestConfig = ccs.ngJestConfig;
    } else {
      // try to look-it up by stringified version
      const stringifiedJestCfg = stringify(jestConfig);
      const serializedCcs = AngularJestTransformer._cachedConfigSets.find(
        (cs) => cs.jestConfig.serialized === stringifiedJestCfg,
      );
      if (serializedCcs) {
        // update the object so that we can find it later
        // this happens because jest first calls getCacheKey with stringified version of
        // the config, and then it calls the transformer with the proper object
        serializedCcs.jestConfig.value = jestConfig;
        this._transformerCfgStr = serializedCcs.transformerConfig.serialized;
        this._ngJestConfig = serializedCcs.ngJestConfig;
      } else {
        const ngJestConfig = new NgJestConfig(jestConfig);
        const transformerCfg = new JsonObject({
          ...jestConfig,
          ...ngJestConfig.parsedTsConfig,
        });
        AngularJestTransformer._cachedConfigSets.push({
          jestConfig: new JsonObject(jestConfig),
          ngJestConfig,
          transformerConfig: transformerCfg,
        });
        this._transformerCfgStr = transformerCfg.serialized;
        this._ngJestConfig = ngJestConfig;
      }
    }
  }
}

export = new AngularJestTransformer();
