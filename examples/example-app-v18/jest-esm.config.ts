import ngPreset from 'jest-preset-angular/presets';
import { type JestConfigWithTsJest, pathsToModuleNameMapper } from 'ts-jest';

import tsconfig from './tsconfig.json';

const esmPreset = ngPreset.createEsmPreset();

export default {
    ...esmPreset,
    moduleNameMapper: {
        ...esmPreset.moduleNameMapper,
        ...pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: '<rootDir>' }),
        '^rxjs': '<rootDir>/node_modules/rxjs/dist/bundles/rxjs.umd.js',
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
