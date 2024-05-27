module.exports = {
    resolver: '<rootDir>/../../../build/resolvers/ng-jest-resolver',
    setupFilesAfterEnv: ['<rootDir>/../../../setup-jest.js'],
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|js|mjs|html)$': ['<rootDir>/../../../build/index.js', require('./ts-jest.config')],
    },
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
};
