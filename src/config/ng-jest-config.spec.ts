import { ScriptTarget } from 'typescript';

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
    expect(compilerOptions.target).toBe(ScriptTarget.ES2015);
  });
});
