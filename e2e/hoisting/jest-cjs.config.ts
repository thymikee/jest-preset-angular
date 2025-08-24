/** @jest-config-loader esbuild-register */

import type { Config } from 'jest';

const config: Config = {
    displayName: 'e2e-hoisting',
    transform: {
        '^.+\\.(ts|mjs|js|html)$': [
            '<rootDir>/../../build/index.js',
            {
                tsconfig: '<rootDir>/tsconfig-cjs.spec.json',
                stringifyContentPathRegex: '\\.(html|svg)$',
            },
        ],
    },
};

export default config;
