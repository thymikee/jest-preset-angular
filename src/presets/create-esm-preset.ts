import type { Config } from 'jest';
import type { TsJestTransformerOptions } from 'ts-jest';

import { basePresetConfig, type JSDOMEnvironment } from './utils';

type EsmPresetType = typeof basePresetConfig &
    Required<Pick<Config, 'extensionsToTreatAsEsm' | 'moduleNameMapper' | 'transformIgnorePatterns' | 'transform'>>;

type EsmPresetOptionsType = {
    tsconfig?: TsJestTransformerOptions['tsconfig'];
    astTransformers?: TsJestTransformerOptions['astTransformers'];
    babelConfig?: TsJestTransformerOptions['babelConfig'];
    diagnostics?: TsJestTransformerOptions['diagnostics'];
    testEnvironment?: JSDOMEnvironment;
};

export const createEsmPreset = (options: EsmPresetOptionsType = {}): EsmPresetType => {
    const { testEnvironment, ...rest } = options;

    return {
        ...basePresetConfig,
        testEnvironment: testEnvironment ?? basePresetConfig.testEnvironment,
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
                    ...rest,
                },
            ],
        },
    };
};
