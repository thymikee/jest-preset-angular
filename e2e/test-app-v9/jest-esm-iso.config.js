const baseConfig = require('./jest.config');
const basePreset = require('jest-preset-angular/presets');

/** @type {import('ts-jest/dist/types').ProjectConfigTsJest} */
module.exports = {
  ...baseConfig,
  preset: 'jest-preset-angular/presets/defaults-esm',
  globals: {
    'ts-jest': {
      ...basePreset.defaultsESM.globals['ts-jest'],
      isolatedModules: true,
    }
  },
  moduleNameMapper: {
    ...baseConfig.moduleNameMapper,
    'tslib': '<rootDir>/node_modules/tslib/tslib.es6.js',
  },
};
