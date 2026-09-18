/** @jest-config-loader esbuild-register */

import { defineConfig } from 'jest';

export default defineConfig({
    displayName: 'e2e-babel-support',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|mjs|js|html)$': [
            '<rootDir>/../../build/index.js',
            {
                babelConfig: true,
                tsconfig: '<rootDir>/tsconfig.spec.json',
                stringifyContentPathRegex: '\\.(html|svg)$',
            },
        ],
    },
});
