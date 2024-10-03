import ngPreset from 'jest-preset-angular/presets';
import type { JestConfigWithTsJest } from 'ts-jest';

export default {
    ...ngPreset.defaultsESM,
    displayName: 'user-lib',
    moduleNameMapper: {
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
