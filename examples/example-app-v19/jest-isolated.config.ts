import presets from 'jest-preset-angular/presets';
import type { JestConfigWithTsJest } from 'ts-jest';

import jestCfg from './jest.config';

export default {
    ...jestCfg,
    ...presets.createCjsPreset({
        isolatedModules: true,
    }),
} satisfies JestConfigWithTsJest;
