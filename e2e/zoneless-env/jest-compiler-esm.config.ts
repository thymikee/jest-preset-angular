/** @jest-config-loader esbuild-register */

import { defineConfig } from 'jest';

export default defineConfig({
    displayName: 'e2e-zoneless-env',
    testEnvironment: 'jsdom',
    snapshotSerializers: [
        '<rootDir>/../../build/serializers/html-comment',
        '<rootDir>/../../build/serializers/ng-snapshot',
        '<rootDir>/../../build/serializers/no-ng-attributes',
    ],
    setupFilesAfterEnv: ['./setup-zoneless-env.mts'],
    moduleNameMapper: {
        rxjs: '<rootDir>/../../node_modules/rxjs/dist/bundles/rxjs.umd.js',
    },
    extensionsToTreatAsEsm: ['.ts', '.mts'],
    transform: {
        '^.+\\.(ts|mts|js|mjs|html)$': [
            '<rootDir>/../../build/index.js',
            {
                useESM: true,
                tsconfig: '<rootDir>/tsconfig-compiler.spec.json',
                stringifyContentPathRegex: '\\.(html|svg)$',
            },
        ],
    },
});
