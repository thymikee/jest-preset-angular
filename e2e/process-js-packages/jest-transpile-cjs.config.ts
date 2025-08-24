/** @jest-config-loader esbuild-register */

import type { Config } from 'jest';

const config: Config = {
    displayName: 'e2e-process-js-packages',
    globals: {
        ngJest: {
            processWithEsbuild: ['**/node_modules/lodash-es/*.js'],
        },
    },
    transform: {
        '^.+\\.(ts|js|mjs|html)$': [
            '<rootDir>/../../build/index.js',
            {
                tsconfig: '<rootDir>/tsconfig-transpile-cjs.spec.json',
                stringifyContentPathRegex: '\\.(html|svg)$',
            },
        ],
    },
    transformIgnorePatterns: ['node_modules/(?!lodash-es|set-utilities)'],
};

export default config;
