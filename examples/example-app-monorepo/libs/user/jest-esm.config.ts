/** @jest-config-loader esbuild-register */

import type { Config } from 'jest';
import { createEsmPreset } from 'jest-preset-angular/presets/index.js';

const esmPreset = createEsmPreset();

export default {
    ...esmPreset,
    displayName: 'user-lib',
    moduleNameMapper: {
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
