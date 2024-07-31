import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
    displayName: 'e2e-babel-support',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|mjs|js|html)$': [
            '<rootDir>/../../build/index.js',
            {
                babelConfig: true,
                tsconfig: '<rootDir>/tsconfig-cjs.spec.json',
                stringifyContentPathRegex: '\\.(html|svg)$',
            },
        ],
    },
};

export default config;
