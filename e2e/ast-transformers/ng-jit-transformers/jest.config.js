module.exports = {
  globals: {
    'ts-jest': {
      stringifyContentPathRegex: '\\.html$',
    },
  },
  resolver: '<rootDir>/../../../build/resolvers/ng-jest-resolver',
  setupFilesAfterEnv: ['<rootDir>/../../../setup-jest.js'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|js|mjs|html)$': '<rootDir>/../../../build/index.js',
  },
  transformIgnorePatterns: ['node_modules/(?!@angular)'],
};
