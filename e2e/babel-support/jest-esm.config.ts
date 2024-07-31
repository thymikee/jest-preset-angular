import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
    displayName: 'e2e-babel-support',
    extensionsToTreatAsEsm: ['.ts'],
    transform: {
        '^.+\\.(ts|mjs|js|html)$': [
            '<rootDir>/../../build/index.js',
            {
                babelConfig: true,
                useESM: true,
                tsconfig: '<rootDir>/tsconfig-esm.spec.json',
            },
        ],
    },
};

export default config;
