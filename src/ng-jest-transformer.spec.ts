import { transformSync } from 'esbuild';
import { TsJestTransformer } from 'ts-jest';

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

describe('NgJestTransformer', () => {
  beforeEach(() => {
    // @ts-expect-error testing purpose
    TsJestTransformer._cachedConfigSets = [];
  });

  test('should create NgJestCompiler and NgJestConfig instances', () => {
    const tr = new NgJestTransformer({
      isolatedModules: true,
    });

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
    const tr = new NgJestTransformer({
      isolatedModules: true,
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

    expect(mockedTransformSync).not.toHaveBeenCalled();
  });

  test('should not use esbuild to process tslib file', () => {
    const tr = new NgJestTransformer({
      isolatedModules: true,
    });
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

  test.each([
    {
      tsconfig: {
        sourceMap: false,
      },
    },
    {
      tsconfig: {
        target: 'es2016',
      },
    },
    {
      tsconfig: {},
    },
  ])('should use esbuild to process mjs or `node_modules` js files to CJS codes', ({ tsconfig }) => {
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
      tsconfig,
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

  test.each([
    {
      tsconfig: {
        sourceMap: false,
      },
    },
    {
      tsconfig: {
        target: 'es2016',
      },
    },
    {
      tsconfig: {},
    },
  ])('should use esbuild to process mjs or `node_modules` js files to ESM codes', ({ tsconfig }) => {
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
      tsconfig,
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
});
