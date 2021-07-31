import { NgJestCompiler } from '../compiler/ng-jest-compiler';
import { NgJestConfig } from '../config/ng-jest-config';
import { NgJestTransformer } from '../ng-jest-transformer';

describe('NgJestTransformer', () => {
  describe('_createCompiler', () => {
    test('should create NgJestCompiler instance', () => {
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
  });
});
