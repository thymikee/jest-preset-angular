const jestCfg = require('./jest.config');
const { defaults } = require('jest-preset-angular/presets');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  ...jestCfg,
  globals: {
    'ts-jest': {
      ...defaults.globals['ts-jest'],
      isolatedModules: true,
    },
  },
};
