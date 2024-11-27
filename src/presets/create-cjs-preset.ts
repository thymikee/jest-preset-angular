import type { Config } from 'jest';
import type { TsJestTransformerOptions } from 'ts-jest';

import { basePresetConfig } from './utils';

type CjsPresetType = typeof basePresetConfig & Required<Pick<Config, 'transformIgnorePatterns' | 'transform'>>;

type CjsPresetOptionsType = Omit<TsJestTransformerOptions, 'useESM' | 'stringifyContentPathRegex' | 'compiler'>;

export const createCjsPreset = (options: CjsPresetOptionsType = {}): CjsPresetType => {
    return {
        ...basePresetConfig,
        transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
        transform: {
            '^.+\\.(ts|js|mjs|html|svg)$': [
                'jest-preset-angular',
                {
                    tsconfig: '<rootDir>/tsconfig.spec.json',
                    stringifyContentPathRegex: '\\.(html|svg)$',
                    ...options,
                },
            ],
        },
    };
};
