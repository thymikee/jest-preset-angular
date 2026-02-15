/** @jest-config-loader esbuild-register */

import type { Config } from 'jest';

const config: Config = {
    displayName: 'e2e-extra-providers-zoneless',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['./setup-zoneless-env.mts'],
    testMatch: ['<rootDir>/__tests__/zoneless-env.spec.ts'],
    moduleNameMapper: {
        rxjs: '<rootDir>/../../node_modules/rxjs/dist/bundles/rxjs.umd.js',
    },
    extensionsToTreatAsEsm: ['.ts', '.mts'],
    transform: {
        '^.+\\.(ts|mts|js|mjs|html)$': [
            '<rootDir>/../../build/index.js',
            {
                tsconfig: '<rootDir>/tsconfig-zoneless-esm.spec.json',
                useESM: true,
            },
        ],
    },
};

export default config;
