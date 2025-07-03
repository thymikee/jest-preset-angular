import type { Config } from 'jest';

const config: Config = {
    modulePathIgnorePatterns: ['examples/.*', 'website/.*'],
    testMatch: ['<rootDir>/src/**/*.spec.ts'],
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|js|mjs|html)$': [
            '<rootDir>/build/index.js',
            {
                tsconfig: 'tsconfig-base.spec.json',
            },
        ],
    },
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
    setupFilesAfterEnv: ['<rootDir>/setup-test-env.ts'],
};

export default config;
