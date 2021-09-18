require('./ngcc-jest-processor');
const baseConfig = require('./jest.config');

/** @type {import('ts-jest/dist/types').ProjectConfigTsJest} */
module.exports = {
  projects: [
    '<rootDir>',
    '<rootDir>/e2e/ast-transformers/downlevel-ctor/jest-esm.config.js',
    '<rootDir>/e2e/ast-transformers/replace-resources/jest-esm.config.js',
    '<rootDir>/e2e/async/jest-esm.config.js',
    '<rootDir>/e2e/custom-typings/jest-esm.config.js',
    '<rootDir>/e2e/jest-globals/jest-esm.config.js',
    '<rootDir>/e2e/snapshot-serializers/jest-esm.config.js',
    '<rootDir>/e2e/with-babel/jest-esm.config.js',
  ],
  ...baseConfig,
  globals: {
    'ts-jest': {
      useESM: true,
      tsconfig: 'tsconfig-esm.spec.json',
    },
  },
};
