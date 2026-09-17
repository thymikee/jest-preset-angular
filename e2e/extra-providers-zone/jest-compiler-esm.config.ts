/** @jest-config-loader esbuild-register */

import { defineConfig } from 'jest';

export default defineConfig({
    displayName: 'e2e-extra-providers-zone',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['./setup-zone-env.mts'],
    testMatch: ['<rootDir>/__tests__/zone-env.spec.ts'],
    moduleNameMapper: {
        rxjs: '<rootDir>/../../node_modules/rxjs/dist/bundles/rxjs.umd.js',
    },
    extensionsToTreatAsEsm: ['.ts', '.mts'],
    transform: {
        '^.+\\.(ts|mts|js|mjs|html)$': [
            '<rootDir>/../../build/index.js',
            {
                tsconfig: '<rootDir>/tsconfig-esm.spec.json',
                useESM: true,
            },
        ],
    },
});
