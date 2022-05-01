import { jest } from '@jest/globals';

import { ngJestPreprocessor } from '../compiler/ng-jest-preprocessor';
import { runNgccJestProcessor } from '../utils/ngcc-jest-processor';

import globalSetup from './global-setup';

jest.mock('../utils/ngcc-jest-processor', () => {
  return {
    runNgccJestProcessor: jest.fn(),
  };
});
jest.mock('../compiler/ng-jest-preprocessor', () => {
  return {
    ngJestPreprocessor: {
      performCompile: jest.fn().mockReturnValue({
        foo: 'bar',
      }),
    },
  };
});
const mockedRunNgccJestProcessor = jest.mocked(runNgccJestProcessor);
const mockedNgJestPreprocessor = jest.mocked(ngJestPreprocessor);

describe('global-setup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test.each([false, undefined])(
    'should not skip ngcc-jest-processor with `skipNgcc: %s` option in `ngJest` config',
    async (skipNgcc) => {
      globalThis.ngJest = {
        skipNgcc,
        tsconfig: 'foo.json',
      };

      await globalSetup(Object.create(null));

      expect(mockedRunNgccJestProcessor).toHaveBeenCalledWith(globalThis.ngJest.tsconfig);
    },
  );

  test('should skip ngcc-jest-processor with `skipNgcc: true` option in `ngJest` config', async () => {
    globalThis.ngJest = {
      skipNgcc: true,
    };

    await globalSetup(Object.create(null));

    expect(mockedRunNgccJestProcessor).not.toHaveBeenCalled();
  });

  test.each([undefined, 'foo.json'])(
    'should run ngJestPreprocessor with `experimentalPrecompilation: true` option in `ngJest` config in non-watch mode',
    async (tsconfig) => {
      globalThis.ngJest = {
        experimentalPrecompilation: true,
        tsconfig,
      };

      await globalSetup(Object.create(null));

      expect(mockedNgJestPreprocessor.performCompile).toHaveBeenCalledWith(globalThis.ngJest.tsconfig);
      expect(process.env.precompiledCount).toBeUndefined();
    },
  );

  test('should run ngJestPreprocessor with `experimentalPrecompilation: true` option in `ngJest` config in watch mode', async () => {
    globalThis.ngJest = {
      experimentalPrecompilation: true,
      tsconfig: 'foo.json',
    };

    await globalSetup({
      ...Object.create(null),
      watch: true,
    });

    expect(mockedNgJestPreprocessor.performCompile).toHaveBeenCalledWith(globalThis.ngJest.tsconfig);
    expect(process.env.precompiledCount).toBe('0');

    await globalSetup({
      ...Object.create(null),
      watch: true,
    });

    expect(process.env.precompiledCount).toBe('1');
  });

  test.each([false, undefined])(
    'should not run ngJestPreprocessor with `experimentalPrecompilation: true` option in `ngJest` config',
    async (experimentalPrecompilation) => {
      globalThis.ngJest = {
        experimentalPrecompilation,
      };

      await globalSetup(Object.create(null));

      expect(mockedNgJestPreprocessor.performCompile).not.toHaveBeenCalled();
    },
  );
});
