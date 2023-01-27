import type { JestConfigWithTsJest, TsJestTransformerOptions } from 'ts-jest';

import snapshotSerializers from '../serializers';

const baseConfig: Pick<JestConfigWithTsJest, 'testEnvironment' | 'moduleFileExtensions' | 'snapshotSerializers'> = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  snapshotSerializers,
};

const defaultTransformerOptions: TsJestTransformerOptions = {
  tsconfig: '<rootDir>/tsconfig.spec.json',
  stringifyContentPathRegex: '\\.(html|svg)$',
};

const defaultPreset = {
  ...baseConfig,
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': ['jest-preset-angular', defaultTransformerOptions],
  },
};

const defaultEsmPreset = {
  ...baseConfig,
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    tslib: 'tslib/tslib.es6.js',
  },
  transform: {
    '^.+\\.(ts|js|html|svg)$': [
      'jest-preset-angular',
      {
        ...defaultTransformerOptions,
        useESM: true,
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!tslib)'],
};

export { defaultPreset, defaultEsmPreset, defaultTransformerOptions };
