/** @jest-config-loader esbuild-register */

import { defineConfig } from 'jest';

export default defineConfig({
    displayName: 'e2e-ng-deep-import',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/../setup-test-env.ts'],
    transform: {
        '^.+\\.(ts|mjs|js|html)$': [
            '<rootDir>/../../build/index.js',
            {
                tsconfig: '<rootDir>/tsconfig-cjs-transpiler.spec.json',
                stringifyContentPathRegex: '\\.(html|svg)$',
            },
        ],
    },
    transformIgnorePatterns: ['node_modules/(?!(.*\\.mjs$|@angular/common/locales/.*\\.js$))'],
});
