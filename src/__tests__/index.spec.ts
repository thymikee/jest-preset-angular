import { NgJestCompiler } from '../compiler/ng-jest-compiler';

describe('AngularJestTransformer', () => {
  beforeEach(() => {
    jest.spyOn(NgJestCompiler.prototype, 'getCompiledOutput').mockReturnValueOnce('');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test.each(['foo.ts', 'foo.js'])('should compile ts or js with allowJs by NgJestCompiler', (fileName) => {
    const jestCfg = { cwd: './', globals: { 'ts-jest': { tsconfig: { allowJs: true } } } };
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
