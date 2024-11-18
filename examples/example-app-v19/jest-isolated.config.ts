import presets from 'jest-preset-angular/presets';
import type { JestConfigWithTsJest } from 'ts-jest';

import jestCfg from './jest.config';

export default {
    ...jestCfg,
    transform: {
        '^.+\\.(ts|js|mjs|html|svg)$': [
            'jest-preset-angular',
            {
                ...presets.defaultTransformerOptions,
                isolatedModules: true,
            },
        ],
    },
} satisfies JestConfigWithTsJest;
