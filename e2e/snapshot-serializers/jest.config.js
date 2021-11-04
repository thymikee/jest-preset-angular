/** @type {import('ts-jest/dist/types').ProjectConfigTsJest} */
module.exports = {
  displayName: 'snapshot-serializers',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/../tsconfig.json',
      stringifyContentPathRegex: '\\.html$',
    },
  },
  resolver: '<rootDir>/../../build/resolvers/ng-jest-resolver',
  setupFilesAfterEnv: ['<rootDir>/../../setup-jest.js'],
  snapshotSerializers: [
    '<rootDir>/../../build/serializers/html-comment',
    '<rootDir>/../../build/serializers/ng-snapshot',
    '<rootDir>/../../build/serializers/no-ng-attributes',
  ],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|js|mjs|html)$': '<rootDir>/../../build/index.js',
  },
  transformIgnorePatterns: ['node_modules/(?!@angular)'],
};
