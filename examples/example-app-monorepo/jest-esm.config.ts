import type { JestConfigWithTsJest } from 'ts-jest';

export default {
    projects: ['<rootDir>/apps/app1/jest-esm.config.ts', '<rootDir>/libs/user/jest-esm.config.ts'],
} satisfies JestConfigWithTsJest;
