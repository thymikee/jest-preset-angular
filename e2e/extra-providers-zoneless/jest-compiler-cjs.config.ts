/** @jest-config-loader esbuild-register */

import { defineConfig } from 'jest';

export default defineConfig({
    displayName: 'e2e-extra-providers-zoneless',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['./setup-zoneless-env.ts'],
    testMatch: ['<rootDir>/__tests__/zoneless-env.spec.ts'],
    transform: {
        '^.+\\.(ts|js|mjs|html)$': [
            '<rootDir>/../../build/index.js',
            {
                tsconfig: '<rootDir>/tsconfig.spec.json',
            },
        ],
    },
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
});
