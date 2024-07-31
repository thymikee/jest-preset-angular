import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
    displayName: 'e2e-process-js-packages',
    globals: {
        ngJest: {
            processWithEsbuild: ['**/node_modules/lodash-es/*.js'],
        },
    },
    transform: {
        '^.+\\.(ts|js|mjs|html)$': [
            '<rootDir>/../../build/index.js',
            {
                tsconfig: '<rootDir>/tsconfig-cjs.spec.json',
                stringifyContentPathRegex: '\\.(html|svg)$',
                isolatedModules: true,
            },
        ],
    },
    transformIgnorePatterns: ['node_modules/(?!lodash-es)'],
};

export default config;
