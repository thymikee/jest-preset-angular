/** @jest-config-loader esbuild-register */

import type { Config } from 'jest';

const config: Config = {
    displayName: 'e2e-ng-jit-transformers',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/../setup-test-env.mts'],
    moduleNameMapper: {
        rxjs: '<rootDir>/../../node_modules/rxjs/dist/bundles/rxjs.umd.js',
    },
    extensionsToTreatAsEsm: ['.ts', '.mts'],
    transform: {
        '^.+\\.(ts|mts|mjs|js|html)$': [
            '<rootDir>/../../build/index.js',
            {
                useESM: true,
                tsconfig: '<rootDir>/tsconfig-esm.spec.json',
                stringifyContentPathRegex: '\\.(html|svg)$',
            },
        ],
    },
};

export default config;
