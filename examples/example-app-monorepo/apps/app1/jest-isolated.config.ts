import type { Config } from 'jest';
import presets from 'jest-preset-angular/presets';

import jestCfg from './jest.config';

export default {
    ...jestCfg,
    ...presets.createCjsPreset({
        tsconfig: '<rootDir>/tsconfig-isolated.spec.json',
    }),
} satisfies Config;
