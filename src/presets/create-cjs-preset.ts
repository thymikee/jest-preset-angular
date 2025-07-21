import type { Config } from 'jest';
import type { TsJestTransformerOptions } from 'ts-jest';

import { basePresetConfig, type JSDOMEnvironment } from './utils';

type CjsPresetType = typeof basePresetConfig & Required<Pick<Config, 'transformIgnorePatterns' | 'transform'>>;

type CjsPresetOptionsType = {
    tsconfig?: TsJestTransformerOptions['tsconfig'];
    astTransformers?: TsJestTransformerOptions['astTransformers'];
    babelConfig?: TsJestTransformerOptions['babelConfig'];
    diagnostics?: TsJestTransformerOptions['diagnostics'];
    testEnvironment?: JSDOMEnvironment;
};

export const createCjsPreset = (options: CjsPresetOptionsType = {}): CjsPresetType => {
    const { testEnvironment, ...rest } = options;

    return {
        ...basePresetConfig,
        testEnvironment: testEnvironment ?? basePresetConfig.testEnvironment,
        transformIgnorePatterns: ['node_modules/(?!(.*\\.mjs$|@angular/common/locales/.*\\.js$))'],
        transform: {
            '^.+\\.(ts|js|mjs|html|svg)$': [
                'jest-preset-angular',
                {
                    tsconfig: '<rootDir>/tsconfig.spec.json',
                    stringifyContentPathRegex: '\\.(html|svg)$',
                    ...rest,
                },
            ],
        },
    };
};
