import { TsJestTransformer } from 'ts-jest/dist/ts-jest-transformer';

describe('NgJestTransformer', () => {
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
      // eslint-disable-next-line
      const tr = require('../');

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

  describe('configsFor', () => {
    test(
      'should return the same config set for same values with different jest config objects' +
        ' but their serialized versions are the same',
      () => {
        const obj1 = {
          config: { cwd: '/foo/.', rootDir: '/bar//dummy/..', globals: {}, testMatch: [], testRegex: [] },
        };
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const obj2 = { ...obj1, config: { ...obj1.config, globals: Object.create(null) } };
        // eslint-disable-next-line
      const cs1 = require('../').configsFor(obj1);
        // eslint-disable-next-line
      const cs2 = require('../').configsFor(obj2);

        expect(cs2).toBe(cs1);
      },
    );

    test('should return the same config set for same values with jest config objects', () => {
      const obj1 = { config: { cwd: '/foo/.', rootDir: '/bar//dummy/..', globals: {}, testMatch: [], testRegex: [] } };
      const obj2 = { ...obj1 };
      // eslint-disable-next-line
      const cs1 = require('../').configsFor(obj1);
      // eslint-disable-next-line
      const cs2 = require('../').configsFor(obj2);

      expect(cs2).toBe(cs1);
    });
  });
});
