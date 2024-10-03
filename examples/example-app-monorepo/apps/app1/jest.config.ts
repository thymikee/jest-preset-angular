import { pathsToModuleNameMapper, type JestConfigWithTsJest } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

export default {
    displayName: 'app1',
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
} satisfies JestConfigWithTsJest;
