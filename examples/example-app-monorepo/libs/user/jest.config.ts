import type { JestConfigWithTsJest } from 'ts-jest';

export default {
    displayName: 'user-lib',
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
} satisfies JestConfigWithTsJest;
