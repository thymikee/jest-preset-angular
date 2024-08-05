const { defaultTransformerOptions } = require('jest-preset-angular/presets');

const jestCfg = require('./jest.config');

/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
    ...jestCfg,
    transform: {
        '^.+\\.(ts|js|mjs|html|svg)$': [
            'jest-preset-angular',
            {
                ...defaultTransformerOptions,
                isolatedModules: true,
            },
        ],
    },
};
