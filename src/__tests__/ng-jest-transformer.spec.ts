import { NgJestCompiler } from '../compiler/ng-jest-compiler';
import { NgJestConfig } from '../config/ng-jest-config';
import { NgJestTransformer } from '../ng-jest-transformer';

const tr = new NgJestTransformer();

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

  test('should process successfully a mjs file with CommonJS mode', () => {
    const result = tr.process(
      `
      const pi = parseFloat(3.124);
      
      export default pi;
    `,
      'foo.mjs',
      {
        config: {
          cwd: process.cwd(),
          extensionsToTreatAsEsm: [],
          testMatch: [],
          testRegex: [],
        },
      } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    );

    expect(typeof result).toBe('object');
    // @ts-expect-error `code` is a property of `TransformSource`
    expect(result.code).toMatchInlineSnapshot(`
      "\\"use strict\\";
      Object.defineProperty(exports, \\"__esModule\\", { value: true });
      const pi = parseFloat(3.124);
      exports.default = pi;
      //# sourceMappingURL=foo.mjs.js.map"
    `);
    // @ts-expect-error `map` is a property of `TransformSource`
    expect(result.map).toBeDefined();
  });

  test('should process successfully a mjs file with ESM mode', () => {
    const result = tr.process(
      `
      const pi = parseFloat(3.124);
      
      export default pi;
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
              useESM: true,
            },
          },
        },
        supportsStaticESM: true,
      } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    );

    expect(typeof result).toBe('object');
    // @ts-expect-error `code` is a property of `TransformSource`
    expect(result.code).toMatchInlineSnapshot(`
      "const pi = parseFloat(3.124);
      export default pi;
      //# sourceMappingURL=foo.mjs.js.map"
    `);
    // @ts-expect-error `map` is a property of `TransformSource`
    expect(result.map).toBeDefined();
  });

  test('should throw syntax error for mjs file with checkJs true', () => {
    expect(() =>
      tr.process(
        `
      const pi == parseFloat(3.124);
      
      export default pi;
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
                tsconfig: {
                  checkJs: true,
                },
              },
            },
          },
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
      ),
    ).toThrowError();
  });
});
