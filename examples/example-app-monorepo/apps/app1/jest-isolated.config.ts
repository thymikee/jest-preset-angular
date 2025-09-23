/** @jest-config-loader esbuild-register */

import type { Config } from 'jest';
import { createCjsPreset } from 'jest-preset-angular/presets/index.js';

import jestCfg from './jest.config.ts';

export default {
    ...jestCfg,
    ...createCjsPreset({
        tsconfig: '<rootDir>/tsconfig-isolated.spec.json',
    }),
} satisfies Config;
