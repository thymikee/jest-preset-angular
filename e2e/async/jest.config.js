module.exports = {
  resolver: '<rootDir>/../../build/resolvers/ng-jest-resolver',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/../../setup-jest.js'],
  transform: {
    '^.+\\.(ts|mjs|js|html)$': ['<rootDir>/../../build/index.js', require('./ts-jest.config')],
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
};
