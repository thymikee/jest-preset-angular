import { ConfigSet } from 'ts-jest/dist/config/config-set';
import { TsJestTransformer } from 'ts-jest/dist/ts-jest-transformer';

import { NgJestCompiler } from './compiler/ng-jest-compiler';

export class NgJestTransformer extends TsJestTransformer {
  protected _createCompiler(configSet: ConfigSet, cacheFS: Map<string, string>): void {
    this._compiler = new NgJestCompiler(configSet, cacheFS);
  }
}
