/** @jest-config-loader esbuild-register */

import type { Config } from 'jest';
import { createCjsPreset } from 'jest-preset-angular/presets/index.js';

export default {
    displayName: 'user-lib',
    ...createCjsPreset(),
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
} satisfies Config;
