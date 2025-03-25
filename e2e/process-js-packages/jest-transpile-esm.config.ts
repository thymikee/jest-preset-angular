import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
    displayName: 'e2e-process-js-packages',
    globals: {
        ngJest: {
            processWithEsbuild: ['**/node_modules/lodash-es/*.js'],
        },
    },
    extensionsToTreatAsEsm: ['.ts', '.mts'],
    transform: {
        '^.+\\.(ts|mts|js|mjs|html)$': [
            '<rootDir>/../../build/index.js',
            {
                useESM: true,
                tsconfig: '<rootDir>/tsconfig-transpile-esm.spec.json',
            },
        ],
    },
};

export default config;
