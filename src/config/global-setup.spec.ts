import globalSetup from './global-setup';

jest.mock('../utils/ngcc-jest-processor', () => {
  return {
    runNgccJestProcessor() {
      console.log('Mock ngcc jest processor');
    },
  };
});

describe('global-setup', () => {
  test('should skip ngcc-jest-processor with `skipNgcc: true` option in `ngJest` config', async () => {
    console.log = jest.fn();
    globalThis.ngJest = {
      skipNgcc: true,
    };

    await globalSetup();

    expect(console.log).not.toHaveBeenCalled();
  });

  test.each([false, undefined])(
    'should not skip ngcc-jest-processor with `skipNgcc: %s` option in `ngJest` config',
    async (skipNgcc) => {
      console.log = jest.fn();
      globalThis.ngJest = {
        skipNgcc,
      };

      await globalSetup();

      expect(console.log).toHaveBeenCalled();
    },
  );
});
