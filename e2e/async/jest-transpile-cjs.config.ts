import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
    displayName: 'e2e-async',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/../../setup-jest'],
    transform: {
        '^.+\\.(ts|mjs|js|html)$': [
            '<rootDir>/../../build/index.js',
            {
                tsconfig: '<rootDir>/tsconfig-cjs.spec.json',
                stringifyContentPathRegex: '\\.(html|svg)$',
                isolatedModules: true,
            },
        ],
    },
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
};

export default config;
