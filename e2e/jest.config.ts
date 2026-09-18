/** @jest-config-loader esbuild-register */

import { defineConfig } from 'jest';

export default defineConfig({
    rootDir: '..',
    roots: ['<rootDir>/e2e'],
    testMatch: ['<rootDir>/e2e/__tests__/**/*.spec.ts', '<rootDir>/e2e/__tests__/**/*.test.ts'],
    testEnvironment: 'node',
    testTimeout: 180_000,
    maxWorkers: 2,
    transform: {
        '^.+\\.tsx?$': [
            '<rootDir>/build/index.js',
            {
                tsconfig: '<rootDir>/e2e/tsconfig.spec.json',
            },
        ],
    },
});
