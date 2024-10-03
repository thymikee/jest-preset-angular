import presets from 'jest-preset-angular/presets';

import jestCfg from './jest.config';

/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
    ...jestCfg,
    transform: {
        '^.+\\.(ts|js|mjs|html|svg)$': [
            'jest-preset-angular',
            {
                ...presets.defaultTransformerOptions,
                isolatedModules: true,
            },
        ],
    },
};
