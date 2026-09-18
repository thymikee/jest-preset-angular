import path from 'node:path';

import type { Config } from '@jest/types';
import type { TsConfigJson } from 'type-fest';

import { NgJestConfig } from '../config/ng-jest-config';

import { NgJestCompiler } from './ng-jest-compiler';

interface CompileSettings {
    compilerOptions?: TsConfigJson.CompilerOptions;
    fileName?: string;
    isolatedModules?: boolean;
    supportsStaticESM?: boolean;
}

function compile(source: string, settings: CompileSettings = {}) {
    const { compilerOptions = {}, fileName = __filename, isolatedModules = true, supportsStaticESM = false } = settings;
    const config = new NgJestConfig({
        cwd: process.cwd(),
        extensionsToTreatAsEsm: supportsStaticESM ? ['.ts'] : [],
        testMatch: [],
        testRegex: [],
        globals: {
            'ts-jest': {
                useESM: supportsStaticESM,
                tsconfig: {
                    isolatedModules,
                    sourceMap: false,
                    module: supportsStaticESM ? 'ES2022' : 'CommonJS',
                    moduleResolution: supportsStaticESM ? 'Bundler' : 'Node10',
                    target: 'ES2020',
                    lib: ['dom', 'es2020'],
                    experimentalDecorators: true,
                    emitDecoratorMetadata: false,
                    esModuleInterop: true,
                    types: ['jest', 'node'],
                    ...compilerOptions,
                },
            },
        },
    } as unknown as Config.ProjectConfig);
    const compiler = new NgJestCompiler(config, new Map());

    const result = compiler.getCompiledOutput(source, fileName, {
        watchMode: false,
        depGraphs: new Map(),
        supportsStaticESM,
    });

    return {
        ...result,
        diagnostics: result.diagnostics ?? [],
    };
}

describe('NgJestCompiler', () => {
    test('emits executable JavaScript for typed TypeScript input', () => {
        const result = compile(`
            interface Account {
                owner: string;
            }

            export const ownerOf = (account: Account): string => account.owner;
        `);

        expect(result.diagnostics).toEqual([]);
        expect(result.code).toContain('const ownerOf = (account) => account.owner');
        expect(result.code).not.toContain('interface Account');
        expect(result.code).not.toContain(': string');
    });

    test('rewrites external component templates and removes style metadata in CommonJS output', () => {
        const result = compile(`
            import { Component } from '@angular/core';

            @Component({
                selector: 'test-panel',
                templateUrl: 'panel.html',
                styles: [':host { display: block; }'],
                styleUrls: ['./legacy.css'],
                styleUrl: './current.css',
                moduleId: 'legacy-module',
            })
            export class TestPanel {}
        `);

        expect(result.diagnostics).toEqual([]);
        expect(result.code).toContain('template: require("./panel.html")');
        expect(result.code).not.toContain('templateUrl');
        expect(result.code).not.toContain('legacy.css');
        expect(result.code).not.toContain('current.css');
        expect(result.code).not.toContain('display: block');
        expect(result.code).not.toContain('legacy-module');
    });

    test('uses an ESM import for an external component template', () => {
        const result = compile(
            `
                import { Component } from '@angular/core';

                @Component({
                    selector: 'esm-panel',
                    templateUrl: './esm-panel.html',
                })
                export class EsmPanel {}
            `,
            { supportsStaticESM: true },
        );

        expect(result.diagnostics).toEqual([]);
        expect(result.code).toContain('import __NG_CLI_RESOURCE__0 from "./esm-panel.html"');
        expect(result.code).toContain('template: __NG_CLI_RESOURCE__0');
        expect(result.code).not.toContain('templateUrl');
    });

    test('preserves NgModule metadata for runtime compilation', () => {
        const result = compile(`
            import { NgModule } from '@angular/core';

            @NgModule({})
            export class TestModule {}
        `);

        expect(result.diagnostics).toEqual([]);
        expect(result.code).toContain('__decorate([');
        expect(result.code).toContain('(0, core_1.NgModule)({})');
    });

    test('resolves Angular package exports during non-isolated compilation', () => {
        const result = compile(
            `
                import { VERSION } from '@angular/core';

                export const angularMajor = VERSION.major;
            `,
            { isolatedModules: false },
        );

        expect(result.diagnostics?.map((diagnostic) => diagnostic.code)).not.toContain(2307);
        expect(result.code).toContain('angularMajor');
    });

    test('accepts TypeScript syntax from a non-TypeScript file extension', () => {
        const result = compile('export const answer: number = 42;', {
            fileName: path.join(process.cwd(), 'virtual-component.template'),
        });

        expect(result.diagnostics).toEqual([]);
        expect(result.code).toContain('exports.answer = 42');
        expect(result.code).not.toContain(': number');
    });
});
