/** @jest-config-loader esbuild-register */

import type { Config } from 'jest';

import jestCfg from './jest-esm.config.ts';

export default {
    ...jestCfg,
    transform: {
        '^.+\\.(ts|js|html|svg)$': [
            'jest-preset-angular',
            {
                tsconfig: '<rootDir>/tsconfig-isolated-esm.spec.json',
                stringifyContentPathRegex: '\\.(html|svg)$',
                useESM: true,
            },
        ],
    },
} satisfies Config;
