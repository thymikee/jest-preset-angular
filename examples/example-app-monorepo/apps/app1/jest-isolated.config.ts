import type { Config } from 'jest';
import { createCjsPreset } from 'jest-preset-angular/presets';

import jestCfg from './jest.config';

export default {
    ...jestCfg,
    ...createCjsPreset({
        tsconfig: '<rootDir>/tsconfig-isolated.spec.json',
    }),
} satisfies Config;
