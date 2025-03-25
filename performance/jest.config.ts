import type { Config } from 'jest';

const config: Config = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|mjs|js|html)$': '<rootDir>/../build/index.js',
    },
    transformIgnorePatterns: ['node_modules/(?!lodash-es)'],
};

export default config;
