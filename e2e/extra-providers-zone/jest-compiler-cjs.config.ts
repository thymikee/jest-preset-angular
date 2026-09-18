/** @jest-config-loader esbuild-register */

import { defineConfig } from 'jest';

export default defineConfig({
    displayName: 'e2e-extra-providers-zone',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['./setup-zone-env.ts'],
    testMatch: ['<rootDir>/__tests__/zone-env.spec.ts'],
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
