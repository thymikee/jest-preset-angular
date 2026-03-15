import type { Config } from '@jest/types';
import ts from 'typescript';

import { NgJestConfig } from './ng-jest-config';

describe('NgJestConfig', () => {
    test('should override some compiler options', () => {
        const compilerOptions = new NgJestConfig(Object.create(null)).parsedTsConfig.options;

        expect(compilerOptions.enableIvy).toBe(true);
        expect(compilerOptions.noEmitOnError).toBe(false);
        expect(compilerOptions.suppressOutputPathCheck).toBe(true);
        expect(compilerOptions.allowEmptyCodegenFiles).toBe(false);
        expect(compilerOptions.annotationsAs).toBe('decorators');
        expect(compilerOptions.enableResourceInlining).toBe(false);
        expect(compilerOptions.allowJs).toBe(true);
    });

    test('should set moduleResolution to Node16 when not explicitly configured', () => {
        const compilerOptions = new NgJestConfig({
            cwd: process.cwd(),
            extensionsToTreatAsEsm: [],
            testMatch: [],
            testRegex: [],
            globals: {
                'ts-jest': {
                    tsconfig: {
                        module: 'CommonJS',
                    },
                },
            },
        } as unknown as Config.ProjectConfig).parsedTsConfig.options;

        expect(compilerOptions.moduleResolution).toBe(ts.ModuleResolutionKind.Node16);
    });

    test('should not override explicitly configured moduleResolution', () => {
        const compilerOptions = new NgJestConfig({
            cwd: process.cwd(),
            extensionsToTreatAsEsm: [],
            testMatch: [],
            testRegex: [],
            globals: {
                'ts-jest': {
                    tsconfig: {
                        module: 'CommonJS',
                        moduleResolution: 'Bundler',
                    },
                },
            },
        } as unknown as Config.ProjectConfig).parsedTsConfig.options;

        expect(compilerOptions.moduleResolution).toBe(ts.ModuleResolutionKind.Bundler);
    });
});
