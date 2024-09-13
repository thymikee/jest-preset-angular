import ngPreset from 'jest-preset-angular/presets';
import type { JestConfigWithTsJest } from 'ts-jest';

const esmPreset = ngPreset.createEsmPreset();

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
} satisfies JestConfigWithTsJest;
