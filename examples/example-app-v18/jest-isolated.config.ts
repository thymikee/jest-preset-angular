import type { Config } from 'jest';
import { createCjsPreset } from 'jest-preset-angular/presets';

import jestCfg from './jest.config';

export default {
    ...jestCfg,
    ...createCjsPreset({
        testEnvironment: 'jest-preset-angular/environments/jest-jsdom-env',
        tsconfig: '<rootDir>/tsconfig-isolated.spec.json',
    }),
} satisfies Config;
