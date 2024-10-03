import type { JestConfigWithTsJest } from 'ts-jest';

export default {
    projects: ['<rootDir>/apps/app1/jest-isolated.config.ts', '<rootDir>/libs/user/jest-isolated.config.ts'],
} satisfies JestConfigWithTsJest;
