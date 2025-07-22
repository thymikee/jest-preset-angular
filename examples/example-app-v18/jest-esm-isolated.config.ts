import type { Config } from 'jest';
import { createEsmPreset } from 'jest-preset-angular/presets';

import jestEsmCfg from './jest-esm.config';

const esmPreset = createEsmPreset({
    tsconfig: '<rootDir>/tsconfig-isolated-esm.spec.json',
    testEnvironment: 'jest-preset-angular/environments/jest-jsdom-env',
});

export default {
    ...jestEsmCfg,
    transform: {
        ...esmPreset.transform,
    },
} satisfies Config;
