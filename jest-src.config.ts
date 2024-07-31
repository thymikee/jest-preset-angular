import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
    modulePathIgnorePatterns: ['examples/.*', 'website/.*'],
    testMatch: ['<rootDir>/src/**/*.spec.ts'],
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|js|mjs|html)$': [
            '<rootDir>/build/index.js',
            {
                tsconfig: 'tsconfig-base.spec.json',
                isolatedModules: true,
            },
        ],
    },
};

export default config;
