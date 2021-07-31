import { ConfigSet } from 'ts-jest/dist/config/config-set';
import { TsJestTransformer } from 'ts-jest/dist/ts-jest-transformer';
import type { ProjectConfigTsJest } from 'ts-jest/dist/types';

import { NgJestCompiler } from './compiler/ng-jest-compiler';
import { NgJestConfig } from './config/ng-jest-config';

export class NgJestTransformer extends TsJestTransformer {
  protected _createConfigSet(config: ProjectConfigTsJest | undefined): ConfigSet {
    return new NgJestConfig(config);
  }

  protected _createCompiler(configSet: ConfigSet, cacheFS: Map<string, string>): void {
    this._compiler = new NgJestCompiler(configSet, cacheFS);
  }
}
