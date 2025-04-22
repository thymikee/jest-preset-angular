import type { JestConfigWithTsJest, TsJestTransformerOptions } from 'ts-jest';

import snapshotSerializers from '../serializers';

import { createCjsPreset } from './create-cjs-preset';
import { createEsmPreset } from './create-esm-preset';

const baseConfig: Pick<JestConfigWithTsJest, 'testEnvironment' | 'moduleFileExtensions' | 'snapshotSerializers'> = {
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
    snapshotSerializers,
};

const defaultTransformerOptions: TsJestTransformerOptions = {
    tsconfig: '<rootDir>/tsconfig.spec.json',
    stringifyContentPathRegex: '\\.(html|svg)$',
};

const defaultPreset = {
    ...baseConfig,
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
    transform: {
        '^.+\\.(ts|js|mjs|html|svg)$': ['jest-preset-angular', defaultTransformerOptions],
    },
};

const defaultEsmPreset = {
    ...baseConfig,
    extensionsToTreatAsEsm: ['.ts'],
    moduleNameMapper: {
        tslib: 'tslib/tslib.es6.js',
    },
    transform: {
        '^.+\\.(ts|js|html|svg)$': [
            'jest-preset-angular',
            {
                ...defaultTransformerOptions,
                useESM: true,
            },
        ],
    },
    transformIgnorePatterns: ['node_modules/(?!tslib)'],
};

const presetEntries = {
    get defaults() {
        console.warn(`
            This preset is DEPRECATED and will be removed in the next major release.
            Please use "createCjsPreset" function instead. See documentation at https://thymikee.github.io/jest-preset-angular/docs/getting-started/presets#createcjspresetoptions
        `);

        return defaultPreset;
    },
    get defaultsESM() {
        console.warn(`
            This preset is DEPRECATED and will be removed in the next major release.
            Please use "createEsmPreset" function instead. See documentation at https://thymikee.github.io/jest-preset-angular/docs/getting-started/presets#createesmpresetoptions
        `);

        return defaultEsmPreset;
    },
    get defaultTransformerOptions() {
        console.warn(`
            These options are DEPRECATED and will be removed in the next major release.
            Please use "createCjsPreset" or "createEsmPreset" function instead. See documentation at https://thymikee.github.io/jest-preset-angular/docs/getting-started/presets
        `);

        return defaultTransformerOptions;
    },
    createCjsPreset,
    createEsmPreset,
};

export = presetEntries;
