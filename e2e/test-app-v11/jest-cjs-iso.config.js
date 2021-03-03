const baseConfig = require('./jest.config');

/** @type {import('ts-jest/dist/types').ProjectConfigTsJest} */
module.exports = {
  ...baseConfig,
  preset: 'jest-preset-angular',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig-cjs.spec.json',
      stringifyContentPathRegex: '\\.html$',
      isolatedModules: true,
    }
  },
};
