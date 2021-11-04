/** @type {import('ts-jest/dist/types').ProjectConfigTsJest} */
module.exports = {
  displayName: 'ng-jit-transformers',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/../../tsconfig.json',
      stringifyContentPathRegex: '\\.html$',
    },
  },
  resolver: '<rootDir>/../../../build/resolvers/ng-jest-resolver',
  setupFilesAfterEnv: ['<rootDir>/../../../setup-jest.js'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|js|mjs|html)$': '<rootDir>/../../../build/index.js',
  },
  transformIgnorePatterns: ['node_modules/(?!@angular|tslib)'],
};
