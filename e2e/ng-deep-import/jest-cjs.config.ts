import type { Config } from 'jest';

const config: Config = {
    displayName: 'e2e-ng-deep-import',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/../setup-test-env.ts'],
    transform: {
        '^.+\\.(ts|mjs|js|html)$': [
            '<rootDir>/../../build/index.js',
            {
                tsconfig: '<rootDir>/tsconfig-cjs.spec.json',
                stringifyContentPathRegex: '\\.(html|svg)$',
            },
        ],
    },
    transformIgnorePatterns: ['node_modules/(?!(.*\\.mjs$|@angular/common/locales/.*\\.js$))'],
};

export default config;
