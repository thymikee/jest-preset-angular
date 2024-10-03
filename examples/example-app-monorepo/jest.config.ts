import type { JestConfigWithTsJest } from 'ts-jest';

export default {
    projects: ['<rootDir>/apps/app1', '<rootDir>/libs/user'],
} satisfies JestConfigWithTsJest;
