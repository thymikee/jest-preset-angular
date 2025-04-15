import type { Config } from 'jest';
import { createCjsPreset } from 'jest-preset-angular/presets';
import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

export default {
    displayName: 'app1',
    ...createCjsPreset(),
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
} satisfies Config;
