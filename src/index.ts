import type { TsJestTransformerOptions } from 'ts-jest';

import { NgJestTransformer } from './ng-jest-transformer';

export default {
  createTransformer: (tsJestConfig?: TsJestTransformerOptions): NgJestTransformer =>
    new NgJestTransformer(tsJestConfig),
};
