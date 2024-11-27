import presets from 'jest-preset-angular/presets';
import { pathsToModuleNameMapper, type JestConfigWithTsJest } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

export default {
    displayName: 'app1',
    ...presets.createCjsPreset(),
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
} satisfies JestConfigWithTsJest;
