import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
    displayName: 'e2e-hoisting',
    transform: {
        '^.+\\.(ts|mjs|js|html)$': [
            '<rootDir>/../../build/index.js',
            {
                tsconfig: '<rootDir>/tsconfig-cjs.spec.json',
                stringifyContentPathRegex: '\\.(html|svg)$',
            },
        ],
    },
};

export default config;
