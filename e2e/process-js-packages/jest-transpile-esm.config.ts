import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
    displayName: 'e2e-process-js-packages',
    globals: {
        ngJest: {
            processWithEsbuild: ['**/node_modules/lodash-es/*.js'],
        },
    },
    extensionsToTreatAsEsm: ['.ts'],
    transform: {
        '^.+\\.(ts|js|mjs|html)$': [
            '<rootDir>/../../build/index.js',
            {
                useESM: true,
                tsconfig: '<rootDir>/tsconfig-esm.spec.json',
                isolatedModules: true,
            },
        ],
    },
};

export default config;
