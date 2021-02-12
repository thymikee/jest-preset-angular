import { jest } from '@jest/globals';
import { TsJestTransformer } from 'ts-jest/dist/ts-jest-transformer';

import { NgJestTransformer } from '../ng-jest-transformer';

describe('NgJestTransformer', () => {
  describe('_configsFor', () => {
    test(
      'should return the same config set for same values with different jest config objects' +
        ' but their serialized versions are the same',
      () => {
        const obj1 = {
          config: { cwd: process.cwd(), extensionsToTreatAsEsm: [], globals: {}, testMatch: [], testRegex: [] },
          cacheFS: new Map(),
        };
        const obj2 = { ...obj1, config: { ...obj1.config, globals: {} } };
        // @ts-expect-error testing purpose
        const cs1 = new NgJestTransformer()._configsFor(obj1);
        // @ts-expect-error testing purpose
        const cs2 = new NgJestTransformer()._configsFor(obj2);

        expect(cs2).toBe(cs1);
      },
    );

    test('should return the same config set for same values with jest config objects', () => {
      const obj1 = {
        config: { cwd: process.cwd(), extensionsToTreatAsEsm: [], globals: {}, testMatch: [], testRegex: [] },
        cacheFS: new Map(),
      };
      const obj2 = { ...obj1 };
      // @ts-expect-error testing purpose
      const cs1 = new NgJestTransformer()._configsFor(obj1);
      // @ts-expect-error testing purpose
      const cs2 = new NgJestTransformer()._configsFor(obj2);

      expect(cs2).toBe(cs1);
    });
  });

  describe('getCacheKey', () => {
    test('should call getCacheKey method from parent class TsJestTransformer', () => {
      TsJestTransformer.prototype.getCacheKey = jest.fn();
      const input = {
        fileContent: 'export default "foo"',
        fileName: 'foo.ts',
        jestConfigStr: '{"foo": "bar"}',
        // eslint-disable-next-line
        options: { config: { foo: 'bar' } as any, instrument: false, rootDir: '/foo' },
      };
      const tr = new NgJestTransformer();
      // @ts-expect-error testing purpose
      tr.getCacheKey(input.fileContent, input.fileName, input.jestConfigStr, input.options);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(TsJestTransformer.prototype.getCacheKey).toHaveBeenCalledWith(
        input.fileContent,
        input.fileName,
        input.jestConfigStr,
        input.options,
      );
    });
  });

  describe('process', () => {
    test('should call getCacheKey method from parent class TsJestTransformer', () => {
      TsJestTransformer.prototype.process = jest.fn();
      const input = {
        fileContent: 'export default "foo"',
        fileName: 'foo.ts',
        // eslint-disable-next-line
        options: { config: { foo: 'bar' } as any, instrument: false, rootDir: '/foo' },
      };
      const tr = new NgJestTransformer();
      // @ts-expect-error testing purpose
      tr.process(input.fileContent, input.fileName, input.options);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(TsJestTransformer.prototype.process).toHaveBeenCalledWith(
        input.fileContent,
        input.fileName,
        input.options,
      );
    });
  });
});
