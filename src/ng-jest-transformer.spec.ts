/** @jest-environment node */

import path from 'node:path';

import type { TsJestTransformOptions } from 'ts-jest';

import { NgJestTransformer } from './ng-jest-transformer';

interface TransformSettings {
    supportsStaticESM?: boolean;
}

function createTransformOptions(id: string, settings: TransformSettings = {}): TsJestTransformOptions {
    const { supportsStaticESM = false } = settings;
    const config = {
        cwd: process.cwd(),
        extensionsToTreatAsEsm: supportsStaticESM ? ['.mjs', '.ts'] : [],
        testMatch: [`**/${id}.spec.ts`],
        testRegex: [],
    };

    return {
        cacheFS: new Map(),
        config,
        configString: JSON.stringify(config),
        instrument: false,
        supportsDynamicImport: supportsStaticESM,
        supportsExportNamespaceFrom: supportsStaticESM,
        supportsStaticESM,
        supportsTopLevelAwait: supportsStaticESM,
        transformerConfig: {},
    } as unknown as TsJestTransformOptions;
}

function fixturePath(name: string): string {
    return path.join(process.cwd(), 'src', '__transformer_fixtures__', name);
}

describe('NgJestTransformer', () => {
    test('converts .mjs exports to CommonJS when static ESM is unavailable', () => {
        const transformer = new NgJestTransformer({
            tsconfig: {
                sourceMap: false,
                target: 'ES2022',
                esModuleInterop: true,
            },
        });

        const result = transformer.process(
            'export const answer = 42;',
            fixturePath('answer.mjs'),
            createTransformOptions('mjs-commonjs'),
        );

        expect(result.code).toContain('module.exports = __toCommonJS');
        expect(result.code).toContain('const answer = 42');
        expect(result.code).not.toContain('export const answer');
    });

    test('keeps .mjs output as ESM when both Jest and ts-jest enable ESM', () => {
        const transformer = new NgJestTransformer({
            useESM: true,
            tsconfig: {
                module: 'ES2022',
                sourceMap: false,
                target: 'ES2022',
                esModuleInterop: true,
            },
        });

        const result = transformer.process(
            'export const answer = 42;',
            fixturePath('answer.mjs'),
            createTransformOptions('mjs-esm', { supportsStaticESM: true }),
        );

        expect(result.code).toContain('export {');
        expect(result.code).toContain('answer');
        expect(result.code).not.toContain('module.exports');
    });

    test('returns an external source map containing the original .mjs source', () => {
        const source = 'export function greet(name) { return `Hello ${name}`; }';
        const filePath = fixturePath('greeting.mjs');
        const transformer = new NgJestTransformer({
            tsconfig: {
                sourceMap: true,
                target: 'ES2022',
                esModuleInterop: true,
            },
        });

        const result = transformer.process(source, filePath, createTransformOptions('mjs-source-map'));
        const sourceMap = (typeof result.map === 'string' ? JSON.parse(result.map) : (result.map ?? {})) as {
            sources?: string[];
            sourcesContent?: string[];
            version?: number;
        };

        expect(sourceMap).toMatchObject({
            sources: [filePath],
            sourcesContent: [source],
            version: 3,
        });
    });

    test('lowers modern JavaScript syntax for an ES2015 compiler target', () => {
        const transformer = new NgJestTransformer({
            tsconfig: {
                sourceMap: false,
                target: 'ES2015',
                esModuleInterop: true,
            },
        });

        const result = transformer.process(
            'export const city = customer?.address?.city ?? "unknown";',
            fixturePath('customer.mjs'),
            createTransformOptions('mjs-es2015'),
        );

        expect(result.code).not.toContain('?.');
        expect(result.code).not.toContain('??');
        expect(result.code).toContain('customer == null');
    });

    test('produces stable cache keys that change with source path and content', () => {
        const transformer = new NgJestTransformer({
            tsconfig: {
                sourceMap: false,
                target: 'ES2022',
                esModuleInterop: true,
            },
        });
        const options = createTransformOptions('cache-key');
        const firstPath = fixturePath('first.ts');
        const secondPath = fixturePath('second.ts');

        const initial = transformer.getCacheKey('export const value = 1;', firstPath, options);

        expect(transformer.getCacheKey('export const value = 1;', firstPath, options)).toBe(initial);
        expect(transformer.getCacheKey('export const value = 1;', secondPath, options)).not.toBe(initial);
        expect(transformer.getCacheKey('export const value = 2;', firstPath, options)).not.toBe(initial);
        expect(initial).toMatch(/^[a-f0-9]{40}$/);
    });

    test('processes Angular TypeScript through the compiler pipeline', () => {
        const transformer = new NgJestTransformer({
            tsconfig: {
                experimentalDecorators: true,
                module: 'CommonJS',
                sourceMap: false,
                target: 'ES2020',
            },
        });

        const result = transformer.process(
            `
                import { Component } from '@angular/core';

                @Component({
                    selector: 'greeting-card',
                    template: '<strong>Hello</strong>',
                })
                export class GreetingCard {}
            `,
            __filename,
            createTransformOptions('angular-typescript'),
        );

        expect(result.code).toContain('GreetingCard');
        expect(result.code).toContain('greeting-card');
        expect(result.code).toContain('<strong>Hello</strong>');
        expect(result.code).not.toContain('@Component');
    });
});
