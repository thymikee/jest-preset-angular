import ngPreset from 'jest-preset-angular/presets';
import { pathsToModuleNameMapper, type JestConfigWithTsJest } from 'ts-jest';

import tsconfig from './tsconfig.json';

export default {
    ...ngPreset.defaultsESM,
    displayName: 'app1',
    moduleNameMapper: {
        ...pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: '<rootDir>' }),
        tslib: 'tslib/tslib.es6.js',
        rxjs: '<rootDir>/../../node_modules/rxjs/dist/bundles/rxjs.umd.js',
    },
    setupFilesAfterEnv: ['<rootDir>/setup-jest-esm.ts'],
    transform: {
        '^.+\\.(ts|js|html|svg)$': [
            'jest-preset-angular',
            {
                tsconfig: '<rootDir>/tsconfig-esm.spec.json',
                stringifyContentPathRegex: '\\.(html|svg)$',
                useESM: true,
            },
        ],
    },
} satisfies JestConfigWithTsJest;
