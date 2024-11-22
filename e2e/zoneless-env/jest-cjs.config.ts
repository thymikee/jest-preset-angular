import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
    displayName: 'e2e-zoneless-env',
    testEnvironment: 'jsdom',
    snapshotSerializers: [
        '<rootDir>/../../build/serializers/html-comment',
        '<rootDir>/../../build/serializers/ng-snapshot',
        '<rootDir>/../../build/serializers/no-ng-attributes',
    ],
    setupFilesAfterEnv: ['./setup-zoneless-env.ts'],
    transform: {
        '^.+\\.(ts|js|mjs|html)$': [
            '<rootDir>/../../build/index.js',
            {
                tsconfig: '<rootDir>/tsconfig-cjs.spec.json',
                stringifyContentPathRegex: '\\.(html|svg)$',
            },
        ],
    },
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
};

export default config;
