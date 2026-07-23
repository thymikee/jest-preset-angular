/** @jest-config-loader esbuild-register */

import type { Config } from 'jest';

const config: Config = {
    displayName: 'e2e-custom-jsdom-env',
    testEnvironment: '<rootDir>/../../environments/jest-jsdom-env.js',
    setupFilesAfterEnv: ['<rootDir>/../setup-test-env.ts'],
    transform: {
        '^.+\\.(ts|mjs|js|html)$': [
            '<rootDir>/../../build/index.js',
            {
                tsconfig: '<rootDir>/tsconfig-cjs.spec.json',
                stringifyContentPathRegex: '\\.(html|svg)$',
                processWithEsbuild: [
                    '**/node_modules/@noble/**/*.js',
                    '**/node_modules/@primeui/license-manager/**/*.mjs',
                    '**/node_modules/@primeuix/**/*.mjs',
                    '**/node_modules/@primeicons/angular/**/*.mjs',
                    '**/node_modules/primeng/**/*.mjs',
                ],
            },
        ],
    },
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$|@noble|@primeui|@primeuix|@primeicons|primeng)'],
};

export default config;
