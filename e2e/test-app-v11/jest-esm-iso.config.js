const baseConfig = require('./jest.config');

/** @type {import('ts-jest/dist/types').ProjectConfigTsJest} */
module.exports = {
  ...baseConfig,
  preset: 'jest-preset-angular/presets/defaults-esm',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig-esm.spec.json',
      stringifyContentPathRegex: '\\.html$',
      useESM: true,
      isolatedModules: true,
    }
  },
  moduleNameMapper: {
    ...baseConfig.moduleNameMapper,
    'tslib': '<rootDir>/node_modules/tslib/tslib.es6.js',
  },
};
