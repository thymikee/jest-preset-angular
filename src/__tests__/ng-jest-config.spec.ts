import ts from 'typescript';

import { NgJestConfig } from '../config/ng-jest-config';

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
    expect(compilerOptions.target).toBe(ts.ScriptTarget.ES2015);
  });

  test('should set typescript target to ES2015 if user is using target higher than ES2016', () => {
    expect(
      new NgJestConfig({
        globals: {
          'ts-jest': {
            tsconfig: {
              target: 'ES2017',
            },
          },
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any).parsedTsConfig.options.target,
    ).toBe(ts.ScriptTarget.ES2015);
  });
});
