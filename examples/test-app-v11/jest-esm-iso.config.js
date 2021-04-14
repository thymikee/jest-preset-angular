const basePreset = require('jest-preset-angular/presets');

const baseConfig = require('./jest.config');

/** @type {import('ts-jest/dist/types').ProjectConfigTsJest} */
module.exports = {
  ...baseConfig,
  preset: 'jest-preset-angular/presets/defaults-esm',
  globals: {
    'ts-jest': {
      ...basePreset.defaultsESM.globals['ts-jest'],
      isolatedModules: true,
    },
  },
  moduleNameMapper: {
    ...baseConfig.moduleNameMapper,
    tslib: '<rootDir>/node_modules/tslib/tslib.es6.js',
  },
};
