import { ConfigSet } from 'ts-jest/dist/config/config-set';

import { NgJestCompiler } from './ng-jest-compiler';

describe('NgJestCompiler', () => {
  test('should transform codes using hoisting, replace resources and downlevel ctor transformers', () => {
    const ngJestConfig = new ConfigSet({
      cwd: process.cwd(),
      extensionsToTreatAsEsm: [],
      testMatch: [],
      testRegex: [],
      globals: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        'ts-jest': {
          isolatedModules: true,
          tsconfig: {
            sourceMap: false,
          },
        },
      },
    } as any); // eslint-disable-line @typescript-eslint/no-explicit-any
    const compiler = new NgJestCompiler(ngJestConfig, new Map());
    compiler.program = {
      // @ts-expect-error testing purpose
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      getTypeChecker: () => {},
    };

    // @ts-expect-error `_makeTransformers` is a private method
    expect(compiler._makeTransformers(compiler.configSet.resolvedTransformers).before.length).toEqual(3);
  });
});
