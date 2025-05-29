import type { Config } from 'jest';
import { createCjsPreset } from 'jest-preset-angular/presets';
import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

export default {
    ...createCjsPreset(),
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
} satisfies Config;
