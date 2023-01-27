module.exports = {
  resolver: '<rootDir>/../../build/resolvers/ng-jest-resolver',
  setupFilesAfterEnv: ['<rootDir>/../../setup-jest.js'],
  snapshotSerializers: [
    '<rootDir>/../../build/serializers/html-comment',
    '<rootDir>/../../build/serializers/ng-snapshot',
    '<rootDir>/../../build/serializers/no-ng-attributes',
  ],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|js|mjs|html)$': ['<rootDir>/../../build/index.js', require('./ts-jest.config')],
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
};
