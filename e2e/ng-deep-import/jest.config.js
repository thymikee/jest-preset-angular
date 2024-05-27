module.exports = {
    moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
    resolver: '<rootDir>/../../build/resolvers/ng-jest-resolver.js',
    transform: {
        '^.+\\.(ts|js|mjs|html)$': '<rootDir>/../../build/index.js',
    },
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
};
