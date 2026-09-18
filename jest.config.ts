/** @jest-config-loader esbuild-register */

import { defineConfig } from 'jest';

export default defineConfig({
    modulePathIgnorePatterns: ['examples/.*', 'website/.*'],
    testMatch: ['<rootDir>/src/**/*.spec.ts'],
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|js|mjs|html)$': [
            '<rootDir>/build/index.js',
            {
                tsconfig: 'tsconfig.spec.json',
            },
        ],
    },
});
