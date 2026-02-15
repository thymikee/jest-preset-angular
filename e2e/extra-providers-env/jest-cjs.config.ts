/** @jest-config-loader esbuild-register */

import type { Config } from 'jest';

const config: Config = {
    displayName: 'e2e-extra-providers-zone',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['./setup-zone-env.ts'],
    testMatch: ['<rootDir>/__tests__/zone-env.spec.ts'],
    transform: {
        '^.+\\.(ts|js|mjs|html)$': [
            '<rootDir>/../../build/index.js',
            {
                tsconfig: '<rootDir>/tsconfig-zone-cjs.spec.json',
            },
        ],
    },
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
};

export default config;
