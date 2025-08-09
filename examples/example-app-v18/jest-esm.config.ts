import type { Config } from 'jest';
import { createEsmPreset } from 'jest-preset-angular/presets/index';
import { pathsToModuleNameMapper } from 'ts-jest';

import tsconfig from './tsconfig.json';

const esmPreset = createEsmPreset({
    tsconfig: '<rootDir>/tsconfig-esm.spec.json',
    testEnvironment: 'jest-preset-angular/environments/jest-jsdom-env',
});

export default {
    ...esmPreset,
    moduleNameMapper: {
        ...esmPreset.moduleNameMapper,
        ...pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: '<rootDir>' }),
        '^rxjs': '<rootDir>/node_modules/rxjs/dist/bundles/rxjs.umd.js',
    },
    setupFilesAfterEnv: ['<rootDir>/setup-jest-esm.ts'],
} satisfies Config;
