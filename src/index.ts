import { TsJestGlobalOptions } from 'ts-jest';

import { NgJestTransformer } from './ng-jest-transformer';

export default {
  createTransformer: (tsJestConfig?: TsJestGlobalOptions | undefined): NgJestTransformer =>
    new NgJestTransformer(tsJestConfig),
};
