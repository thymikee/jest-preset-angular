import { TsJestTransformer } from 'ts-jest/dist/ts-jest-transformer';

import { NgJestCompiler } from '../compiler/ng-jest-compiler';

describe('NgJestTransformer', () => {
  describe('configsFor', () => {
    test(
      'should return the same config set for same values with different jest config objects' +
        ' but their serialized versions are the same',
      () => {
        const obj1 = { globals: {}, testMatch: [], testRegex: [] };
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const obj2 = { ...obj1, globals: Object.create(null) };
        // eslint-disable-next-line
        const cs1 = require('../').configsFor(obj1);
        // eslint-disable-next-line
        const cs2 = require('../').configsFor(obj2);

        expect(cs2).toBe(cs1);
      },
    );

    test('should return the same config set for same values with jest config objects', () => {
      const obj1 = { globals: {}, testMatch: [], testRegex: [] };
      const obj2 = { ...obj1 };
      // eslint-disable-next-line
      const cs1 = require('../').configsFor(obj1);
      // eslint-disable-next-line
      const cs2 = require('../').configsFor(obj2);

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

  describe('process', () => {
    beforeEach(() => {
      jest.spyOn(NgJestCompiler.prototype, 'getCompiledOutput').mockReturnValueOnce('');
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    test.each(['foo.ts', 'foo.js'])('should compile ts or js with allowJs by NgJestCompiler', (fileName) => {
      const jestCfg = {
        cwd: './',
        testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
        testRegex: ['(/__tests__/.*|(\\\\.|/)(test|spec))\\\\.[jt]sx?$'],
        globals: { 'ts-jest': { tsconfig: { allowJs: true } } },
      };
      const input = {
        fileContent: 'const foo = 1',
        jestConfigStr: '{"cwd": "./"}',
        // eslint-disable-next-line
        options: { config: { ...jestCfg } as any, instrument: false, rootDir: '/foo' },
      };
      // eslint-disable-next-line
      const ngJestTransformer = require('../');
      ngJestTransformer.getCacheKey(input.fileContent, fileName, input.jestConfigStr, input.options);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ngJestTransformer.process(input.fileContent, fileName, jestCfg as any);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(NgJestCompiler.prototype.getCompiledOutput).toHaveBeenCalledWith(fileName, input.fileContent);
    });

    test.each([
      {
        fileName: 'foo.html',
        fileContent: '<h1>Hello world</h1>',
      },
      {
        fileName: 'foo.js',
        fileContent: 'const foo = 1',
      },
      {
        fileName: 'foo.d.ts',
        fileContent: 'type foo = number',
      },
    ])('should compile other files with ts-jest', ({ fileName, fileContent }) => {
      const jestCfg = {
        cwd: './',
        testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
        testRegex: ['(/__tests__/.*|(\\\\.|/)(test|spec))\\\\.[jt]sx?$'],
        globals: {
          'ts-jest': {
            tsconfig: { allowJs: false },
            stringifyContentPathRegex: '\\.html$',
          },
        },
      };
      const input = {
        jestConfigStr: '{"cwd": "./"}',
        // eslint-disable-next-line
        options: { config: { ...jestCfg } as any, instrument: false, rootDir: '/foo' },
      };
      // eslint-disable-next-line
      const ngJestTransformer = require('../');
      ngJestTransformer.getCacheKey(fileContent, fileName, input.jestConfigStr, input.options);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ngJestTransformer.process(fileContent, fileName, jestCfg as any);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(NgJestCompiler.prototype.getCompiledOutput).not.toHaveBeenCalled();
    });
  });
});
