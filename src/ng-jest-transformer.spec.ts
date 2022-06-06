import { transformSync } from 'esbuild';

import { NgJestCompiler } from './compiler/ng-jest-compiler';
import { NgJestConfig } from './config/ng-jest-config';
import { NgJestTransformer } from './ng-jest-transformer';

const tr = new NgJestTransformer();

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
  test('should create NgJestCompiler and NgJestConfig instances', () => {
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
          globals: {
            'ts-jest': {
              isolatedModules: true,
            },
          },
        },
      } as any, // eslint-disable-line @typescript-eslint/no-explicit-any,
    );

    expect(mockedTransformSync).not.toHaveBeenCalled();
  });

  test('should not use esbuild to process tslib file', () => {
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
          globals: {
            'ts-jest': {
              isolatedModules: true,
            },
          },
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
          'ts-jest': {
            tsconfig,
          },
          ngJest: {
            processWithEsbuild: ['node_modules/foo.js'],
          },
        },
      },
    } as any; // eslint-disable-line @typescript-eslint/no-explicit-any
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
          'ts-jest': {
            tsconfig,
            useESM: true,
          },
          ngJest: {
            processWithEsbuild: ['node_modules/foo.js'],
          },
        },
      },
      supportsStaticESM: true,
    } as any; // eslint-disable-line @typescript-eslint/no-explicit-any
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
