require('jest-preset-angular/ngcc-jest-processor');
const baseConfig = require('./jest.config');

/** @type {import('ts-jest/dist/types').ProjectConfigTsJest} */
module.exports = {
  ...baseConfig,
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig-esm.spec.json',
      stringifyContentPathRegex: '\\.html$',
      useESM: true,
      isolatedModules: true,
    }
  },
};
