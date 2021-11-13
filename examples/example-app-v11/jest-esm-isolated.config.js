const jestCfg = require('./jest-esm.config');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
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
