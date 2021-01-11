const baseConfig = require('./jest.config');

/** @type {import('ts-jest/dist/types').ProjectConfigTsJest} */
module.exports = {
  ...baseConfig,
  preset: 'jest-preset-angular/presets/defaults-esm',
  moduleNameMapper: {
    ...baseConfig.moduleNameMapper,
    'tslib': '<rootDir>/node_modules/tslib/tslib.es6.js',
  },
};
