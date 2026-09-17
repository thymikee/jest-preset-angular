/** @jest-config-loader esbuild-register */

import { defineConfig } from 'jest';

export default defineConfig({
    displayName: 'e2e-process-js-packages',
    transform: {
        '^.+\\.(ts|js|mjs|html)$': [
            '<rootDir>/../../build/index.js',
            {
                processWithEsbuild: ['**/node_modules/lodash-es/*.js'],
                tsconfig: '<rootDir>/tsconfig-cjs-transpiler.spec.json',
                stringifyContentPathRegex: '\\.(html|svg)$',
            },
        ],
    },
    transformIgnorePatterns: ['node_modules/(?!lodash-es|set-utilities)'],
});
