import type { Config } from 'jest';
import type { TsJestTransformerOptions } from 'ts-jest';

import { basePresetConfig } from './utils';

type EsmPresetType = typeof basePresetConfig &
    Required<Pick<Config, 'extensionsToTreatAsEsm' | 'moduleNameMapper' | 'transformIgnorePatterns' | 'transform'>>;

type EsmPresetOptionsType = Omit<TsJestTransformerOptions, 'useESM' | 'stringifyContentPathRegex' | 'compiler'>;

export const createEsmPreset = (options: EsmPresetOptionsType = {}): EsmPresetType => {
    return {
        ...basePresetConfig,
        extensionsToTreatAsEsm: ['.ts'],
        moduleNameMapper: {
            tslib: 'tslib/tslib.es6.js',
        },
        transformIgnorePatterns: ['node_modules/(?!tslib)'],
        transform: {
            '^.+\\.(ts|js|html|svg)$': [
                'jest-preset-angular',
                {
                    tsconfig: '<rootDir>/tsconfig.spec.json',
                    stringifyContentPathRegex: '\\.(html|svg)$',
                    useESM: true,
                    ...options,
                },
            ],
        },
    };
};
