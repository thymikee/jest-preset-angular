import type { TransformOptionsTsJest, TsJestGlobalOptions } from 'ts-jest/dist/types';

export interface NgJestGlobalOptions {
  precompiledOutput: Record<string, string>;
}

export interface TransformOptionsNgJest extends Omit<TransformOptionsTsJest, 'config'> {
  config: {
    globals: {
      'ts-jest': TsJestGlobalOptions;
      ngJest?: NgJestGlobalOptions;
    };
  };
}
