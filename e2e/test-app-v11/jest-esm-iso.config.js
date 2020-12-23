require('jest-preset-angular/ngcc-jest-processor');
const baseConfig = require('./jest.config');

/** @type {import('ts-jest/dist/types').ProjectConfigTsJest} */
module.exports = {
  ...baseConfig,
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig-esm.spec.json',
      stringifyContentPathRegex: '\\.html$',
      astTransformers: {
        before: require('jest-preset-angular/build/transformers'),
      },
      useESM: true,
      isolatedModules: true,
    }
  },
};
