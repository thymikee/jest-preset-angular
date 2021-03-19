const jestCfg = require('./jest.config');

/** @type {import('ts-jest/dist/types').ProjectConfigTsJest} */
module.exports = {
  ...jestCfg,
  preset: 'ts-jest/presets/default-esm',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig-esm.spec.json',
      useESM: true,
    },
  },
}
