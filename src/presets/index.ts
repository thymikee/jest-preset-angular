import type { ProjectConfigTsJest } from 'ts-jest';

import snapshotSerializers from '../serializers';

const baseConfig: Pick<
  ProjectConfigTsJest,
  'globals' | 'testEnvironment' | 'moduleFileExtensions' | 'snapshotSerializers'
> = {
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  snapshotSerializers,
};

export default {
  defaults: {
    ...baseConfig,
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
    transform: {
      '^.+\\.(ts|js|mjs|html|svg)$': 'jest-preset-angular',
    },
  },
  defaultsESM: {
    ...baseConfig,
    extensionsToTreatAsEsm: ['.ts'],
    globals: {
      'ts-jest': {
        ...baseConfig.globals['ts-jest'],
        useESM: true,
      },
    },
    moduleNameMapper: {
      tslib: 'tslib/tslib.es6.js',
    },
    transform: {
      '^.+\\.(ts|js|html|svg)$': 'jest-preset-angular',
    },
    transformIgnorePatterns: ['node_modules/(?!tslib)'],
  },
};
