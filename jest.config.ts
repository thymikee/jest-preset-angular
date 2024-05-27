import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
    moduleNameMapper: {
        '@angular/compiler-cli/ngcc': '<rootDir>/node_modules/@angular/compiler-cli/bundles/ngcc/main-ngcc.js',
    },
    testEnvironment: 'jsdom',
    modulePathIgnorePatterns: ['examples/.*', 'website/.*'],
    testPathIgnorePatterns: ['/node_modules/', '/examples/', '/e2e/.*/__tests__', '\\.snap$'],
    transform: {
        '^.+\\.(ts|js|mjs|html)$': [
            '<rootDir>/build/index.js',
            {
                tsconfig: 'tsconfig.spec.json',
                isolatedModules: true,
            },
        ],
    },
};

export default config;
