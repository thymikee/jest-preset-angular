/** @jest-config-loader esbuild-register */

import type { Config } from 'jest';

const config: Config = {
    displayName: 'e2e-full-ivy-lib',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/../setup-test-env.ts'],
    transform: {
        '^.+\\.(ts|mjs|js|html)$': [
            '<rootDir>/../../build/index.js',
            {
                tsconfig: '<rootDir>/tsconfig-cjs.spec.json',
                stringifyContentPathRegex: '\\.(html|svg)$',
            },
        ],
    },
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
};

export default config;
