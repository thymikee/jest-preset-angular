import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
    displayName: 'e2e-automocks',
    extensionsToTreatAsEsm: ['.ts', '.mts'],
    setupFilesAfterEnv: ['<rootDir>/../setup-test-env.mts', '<rootDir>/setup-test-env.mts'],
    transform: {
        '^.+\\.(ts|mts|mjs|js|html)$': [
            '<rootDir>/../../build/index.js',
            {
                babelConfig: true,
                useESM: true,
                tsconfig: '<rootDir>/tsconfig-esm.spec.json',
            },
        ],
    },
    moduleNameMapper: {
        '^external-lib$': '<rootDir>/external-lib/index.ts',
    },
};

export default config;
