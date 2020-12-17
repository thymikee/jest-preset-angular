import type { TransformedSource, Transformer, TransformOptions } from '@jest/transform';
import type { Config } from '@jest/types';
import { DECLARATION_TYPE_EXT, JS_JSX_REGEX } from 'ts-jest/dist/constants';
import { TsJestTransformer } from 'ts-jest/dist/ts-jest-transformer';
import { stringify } from 'ts-jest/dist/utils/json';
import { JsonableValue } from 'ts-jest/dist/utils/jsonable-value';

import { NgJestConfig } from './config/ng-jest-config';
import { NgJestCompiler } from './compiler/ng-jest-compiler';

interface CachedConfigSet {
  ngJestConfig: NgJestConfig;
  jestConfig: JsonableValue<Config.ProjectConfig>;
  transformerCfgStr: string;
  ngJestCompiler: NgJestCompiler;
}

class NgJestTransformer extends TsJestTransformer implements Transformer {
  /**
   * cache config set between each test run
   */
  private static readonly _cachedConfigSets: CachedConfigSet[] = [];
  private _ngJestCompiler!: NgJestCompiler;

  // @ts-expect-error this comment can be removed with ts-jest 27
  process(fileContent: string, filePath: Config.Path, transformOptions: TransformOptions): TransformedSource | string {
    const isDefinitionFile = filePath.endsWith(DECLARATION_TYPE_EXT);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const jestConfig = transformOptions.config;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const isJsFile = JS_JSX_REGEX.test(filePath);
    const ngJestCfg = this.configsFor(jestConfig);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const shouldStringifyContent = ngJestCfg.shouldStringifyContent(filePath);

    return shouldStringifyContent || isDefinitionFile || (!ngJestCfg.parsedTsConfig.options.allowJs && isJsFile)
      ? super.process(fileContent, filePath, jestConfig, transformOptions)
      : this._ngJestCompiler.getCompiledOutput(filePath, fileContent);
  }

  // @ts-expect-error this comment can be removed with ts-jest 27
  getCacheKey(fileContent: string, filePath: string, transformOptions: TransformOptions): string {
    return super.getCacheKey(fileContent, filePath, '', transformOptions);
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
      this._ngJestCompiler = ccs.ngJestCompiler;
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
        this._ngJestCompiler = serializedCcs.ngJestCompiler;
        ngJestConfig = serializedCcs.ngJestConfig;
      } else {
        // create the new record in the index
        this.logger.info('no matching config-set found, creating a new one');

        ngJestConfig = new NgJestConfig(jestConfig);
        this._ngJestCompiler = new NgJestCompiler(ngJestConfig);
        this._transformCfgStr = new JsonableValue({
          ...jestConfig,
          ...ngJestConfig.parsedTsConfig,
        }).serialized;
        NgJestTransformer._cachedConfigSets.push({
          jestConfig: new JsonableValue(jestConfig),
          ngJestConfig,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          transformerCfgStr: this._transformCfgStr,
          ngJestCompiler: this._ngJestCompiler,
        });
      }
    }

    return ngJestConfig;
  }
}

export = new NgJestTransformer();
