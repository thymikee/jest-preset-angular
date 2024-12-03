import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|mjs|js|html)$': [
            '<rootDir>/../build/index.js',
            {
                isolatedModules: true,
            },
        ],
    },
    transformIgnorePatterns: ['node_modules/(?!lodash-es)'],
};

export default config;
