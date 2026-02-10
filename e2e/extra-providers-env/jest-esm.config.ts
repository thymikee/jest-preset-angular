/** @jest-config-loader esbuild-register */

import type { Config } from 'jest';

const config: Config = {
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
                tsconfig: '<rootDir>/tsconfig-zone-esm.spec.json',
                useESM: true,
            },
        ],
    },
};

export default config;
