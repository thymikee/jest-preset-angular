/** @jest-config-loader esbuild-register */

import type { Config } from 'jest';

const config: Config = {
    displayName: 'e2e-babel-support',
    extensionsToTreatAsEsm: ['.ts', '.mts'],
    transform: {
        '^.+\\.(ts|mts|mjs|js|html)$': [
            '<rootDir>/../../build/index.js',
            {
                babelConfig: true,
                useESM: true,
                tsconfig: '<rootDir>/tsconfig-transpile-esm.spec.json',
            },
        ],
    },
};

export default config;
