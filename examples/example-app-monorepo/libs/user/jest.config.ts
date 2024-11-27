import presets from 'jest-preset-angular/presets';
import type { JestConfigWithTsJest } from 'ts-jest';

export default {
    displayName: 'user-lib',
    ...presets.createCjsPreset(),
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
} satisfies JestConfigWithTsJest;
