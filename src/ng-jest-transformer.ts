import path from 'path';

import type { TransformedSource } from '@jest/transform';
import type { Config } from '@jest/types';
import { transformSync } from 'esbuild';
import { ConfigSet } from 'ts-jest/dist/config/config-set';
import { TsJestTransformer } from 'ts-jest/dist/ts-jest-transformer';
import type { ProjectConfigTsJest, TransformOptionsTsJest } from 'ts-jest/dist/types';

import { NgJestCompiler } from './compiler/ng-jest-compiler';
import { NgJestConfig } from './config/ng-jest-config';

export class NgJestTransformer extends TsJestTransformer {
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
     * TypeScript < 4.5 doesn't support compiling `.mjs` file by default when running `tsc` which throws error
     */
    if (path.extname(filePath) === '.mjs') {
      const { target, sourceMap } = configSet.parsedTsConfig.options;
      const { code, map } = transformSync(fileContent, {
        loader: 'js',
        format: 'cjs',
        target: target === configSet.compilerModule.ScriptTarget.ES2015 ? 'es2015' : 'es2016',
        sourcemap: sourceMap,
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
