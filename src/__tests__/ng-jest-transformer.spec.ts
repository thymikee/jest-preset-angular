import { transformSync } from 'esbuild';

import { NgJestCompiler } from '../compiler/ng-jest-compiler';
import { NgJestConfig } from '../config/ng-jest-config';
import { NgJestTransformer } from '../ng-jest-transformer';

const tr = new NgJestTransformer();

jest.mock('esbuild', () => {
  return {
    transformSync: jest.fn().mockReturnValue({
      code: 'bla bla',
      map: JSON.stringify({ version: 1, sourceContent: 'foo foo' }),
    }),
  };
});

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
  ])('should process successfully a mjs file to CommonJS codes', ({ tsconfig }) => {
    const result = tr.process(
      `
      const pi = parseFloat(3.124);
      
      export { pi };
    `,
      'foo.mjs',
      {
        config: {
          cwd: process.cwd(),
          extensionsToTreatAsEsm: [],
          testMatch: [],
          testRegex: [],
          globals: {
            'ts-jest': {
              tsconfig,
            },
          },
        },
      } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((transformSync as unknown as jest.MockInstance<unknown, any>).mock.calls[0]).toMatchSnapshot();
    // @ts-expect-error `code` is a property of `TransformSource`
    expect(result.code).toBeDefined();
    // @ts-expect-error `code` is a property of `TransformSource`
    expect(result.map).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (transformSync as unknown as jest.MockInstance<unknown, any>).mockClear();
  });
});
