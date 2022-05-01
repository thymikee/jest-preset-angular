import jestCfg from './jest-esm.config.mjs';

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const jestIsolatedCfg = {
  ...jestCfg,
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig-esm.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
      isolatedModules: true,
      useESM: true,
    },
  },
};

export default jestIsolatedCfg;
