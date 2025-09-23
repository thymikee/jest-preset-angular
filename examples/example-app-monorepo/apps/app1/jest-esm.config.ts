/** @jest-config-loader esbuild-register */

import type { Config } from 'jest';
import { createEsmPreset } from 'jest-preset-angular/presets/index.js';
import { pathsToModuleNameMapper } from 'ts-jest';

import tsconfig from './tsconfig.json' with { type: 'json' };

const esmPreset = createEsmPreset();

export default {
    ...esmPreset,
    displayName: 'app1',
    moduleNameMapper: {
        ...pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: '<rootDir>' }),
        ...esmPreset.moduleNameMapper,
        '^rxjs': '<rootDir>/../../node_modules/rxjs/dist/bundles/rxjs.umd.js',
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
} satisfies Config;
