import jestCfg from './jest-esm.config.mjs';

/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
const jestIsolatedCfg = {
  ...jestCfg,
  transform: {
    '^.+\\.(ts|js|html|svg)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig-esm.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
        isolatedModules: true,
        useESM: true,
      },
    ],
  },
};

export default jestIsolatedCfg;
