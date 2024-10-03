import type { JestConfigWithTsJest } from 'ts-jest';

import jestCfg from './jest-esm.config';

export default {
    ...jestCfg,
    transform: {
        '^.+\\.(ts|js|html|svg)$': [
            'jest-preset-angular',
            {
                tsconfig: '<rootDir>/tsconfig-esm.spec.json',
                stringifyContentPathRegex: '\\.(html|svg)$',
                isolatedModules: true,
                useESM: true,
            },
        ],
    },
} satisfies JestConfigWithTsJest;
