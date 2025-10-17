import { transformSync } from 'esbuild';
import { TsJestTransformer } from 'ts-jest';
import type { TsConfigJson } from 'type-fest';
import { transpileModule } from 'typescript';

import packageJson from '../package.json';

import { NgJestCompiler } from './compiler/ng-jest-compiler';
import { NgJestConfig } from './config/ng-jest-config';
import { NgJestTransformer } from './ng-jest-transformer';

jest.mock('esbuild', () => {
    return {
        transformSync: jest.fn().mockReturnValue({
            code: '',
            map: '',
        }),
    };
});
const mockedTransformSync = jest.mocked(transformSync);
jest.mock('typescript', () => {
    return {
        ...jest.requireActual('typescript'),
        transpileModule: jest.fn().mockReturnValue({
            outputText: '',
        }),
    };
});
const mockTranspileModule = jest.mocked(transpileModule);

describe('NgJestTransformer', () => {
    beforeEach(() => {
        // @ts-expect-error testing purpose
        TsJestTransformer._cachedConfigSets = [];
        mockTranspileModule.mockClear();
    });

    test('should create NgJestCompiler and NgJestConfig instances', () => {
        const tr = new NgJestTransformer();

        // @ts-expect-error testing purpose
        const cs = tr._createConfigSet({
            cwd: process.cwd(),
            extensionsToTreatAsEsm: [],
            testMatch: [],
            testRegex: [],
        });

        // @ts-expect-error testing purpose
        tr._createCompiler(cs, new Map());

        // @ts-expect-error testing purpose
        expect(tr._compiler).toBeInstanceOf(NgJestCompiler);
        expect(cs).toBeInstanceOf(NgJestConfig);
    });

    test('should not use esbuild to process js files which are not from `node_modules`', () => {
        const tr = new NgJestTransformer();
        tr.process(
            `
      const pi = parseFloat(3.124);

      export { pi };
    `,
            'foo.js',
            {
                config: {
                    cwd: process.cwd(),
                    extensionsToTreatAsEsm: [],
                    testMatch: [],
                    testRegex: [],
                },
            } as any, // eslint-disable-line @typescript-eslint/no-explicit-any,
        );

        expect(mockedTransformSync).not.toHaveBeenCalled();
    });

    test('should not use esbuild to process tslib file', () => {
        const tr = new NgJestTransformer();
        tr.process(
            `
      const pi = parseFloat(3.124);

      export { pi };
    `,
            'node_modules/tslib.es6.js',
            {
                config: {
                    cwd: process.cwd(),
                    extensionsToTreatAsEsm: [],
                    testMatch: [],
                    testRegex: [],
                },
            } as any, // eslint-disable-line @typescript-eslint/no-explicit-any,
        );

        expect(mockedTransformSync).not.toHaveBeenCalled();
    });

    test('should use esbuild to process files defined via "processWithEsbuild" transform option', () => {
        const tr = new NgJestTransformer({
            processWithEsbuild: ['foo.js'],
        });
        tr.process(
            `
      const pi = parseFloat(3.124);

      export { pi };
    `,
            'foo.js',
            {
                config: {
                    cwd: process.cwd(),
                    extensionsToTreatAsEsm: [],
                    testMatch: [],
                    testRegex: [],
                },
            } as any, // eslint-disable-line @typescript-eslint/no-explicit-any,
        );

        expect(mockedTransformSync).toHaveBeenCalled();

        mockedTransformSync.mockClear();
    });

    test.each([
        {
            sourceMap: false,
        },
        {
            target: 'es2016',
        },
        {},
    ])('should use esbuild to process mjs or `node_modules` js files to CJS codes', (tsconfig) => {
        const transformCfg = {
            cacheFS: new Map(),
            config: {
                cwd: process.cwd(),
                extensionsToTreatAsEsm: [],
                testMatch: [],
                testRegex: [],
                globals: {
                    ngJest: {
                        processWithEsbuild: ['node_modules/foo.js'],
                    },
                },
            },
        } as any; // eslint-disable-line @typescript-eslint/no-explicit-any
        const tr = new NgJestTransformer({
            tsconfig: tsconfig as TsConfigJson,
        });
        tr.process(
            `
      const pi = parseFloat(3.124);

      export { pi };
    `,
            'foo.mjs',
            transformCfg,
        );
        tr.process(
            `
      const pi = parseFloat(3.124);

      export { pi };
    `,
            'node_modules/foo.js',
            transformCfg,
        );

        expect(mockedTransformSync.mock.calls[0]).toMatchSnapshot();
        expect(mockedTransformSync.mock.calls[1]).toMatchSnapshot();

        mockedTransformSync.mockClear();
    });

    it('should use "transpileModule" to process `node_modules` js file', () => {
        const transformCfg = {
            cacheFS: new Map(),
            config: {
                cwd: process.cwd(),
                extensionsToTreatAsEsm: [],
                testMatch: [],
                testRegex: [],
            },
        } as any; // eslint-disable-line @typescript-eslint/no-explicit-any
        const tr = new NgJestTransformer({});
        tr.process(
            `
      const pi = parseFloat(3.124);

      export { pi };
    `,
            'node_modules/random-package/foo.js',
            transformCfg,
        );

        expect(mockTranspileModule.mock.calls[0][1].fileName).toBe('node_modules/random-package/foo.js');
    });

    test.each([
        {
            sourceMap: false,
        },
        {
            target: 'es2016',
        },
        {},
    ])('should use esbuild to process mjs or `node_modules` js files to ESM codes', (tsconfig) => {
        const transformCfg = {
            cacheFS: new Map(),
            config: {
                cwd: process.cwd(),
                extensionsToTreatAsEsm: [],
                testMatch: [],
                testRegex: [],
                globals: {
                    ngJest: {
                        processWithEsbuild: ['node_modules/foo.js'],
                    },
                },
            },
            supportsStaticESM: true,
        } as any; // eslint-disable-line @typescript-eslint/no-explicit-any
        const tr = new NgJestTransformer({
            tsconfig: tsconfig as TsConfigJson,
            useESM: true,
        });
        tr.process(
            `
      const pi = parseFloat(3.124);

      export { pi };
    `,
            'foo.mjs',
            transformCfg,
        );
        tr.process(
            `
      const pi = parseFloat(3.124);

      export { pi };
    `,
            'node_modules/foo.js',
            transformCfg,
        );

        expect(mockedTransformSync.mock.calls[0]).toMatchSnapshot();
        expect(mockedTransformSync.mock.calls[1]).toMatchSnapshot();

        mockedTransformSync.mockClear();
    });

    it('should include version from package.json', async () => {
        const transformCfg = {
            config: {
                cwd: process.cwd(),
                extensionsToTreatAsEsm: [],
                testMatch: [],
                testRegex: [],
            },
        } as any; // eslint-disable-line @typescript-eslint/no-explicit-any
        const tr = new NgJestTransformer();

        packageJson.version = '1.0.0';
        const cacheKey1 = tr.getCacheKey('export const foo = 1', 'file1.ts', transformCfg);
        packageJson.version = '2.0.0';
        const cacheKey2 = tr.getCacheKey('export const foo = 1', 'file1.ts', transformCfg);

        expect(cacheKey1).not.toBe(cacheKey2);
    });
});
