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

    await globalSetup(Object.create(null), {
      globals: {
        ngJest: {
          skipNgcc: true,
        },
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    expect(console.log).not.toHaveBeenCalled();
  });

  test.each([false, undefined, null])(
    'should not skip ngcc-jest-processor with `skipNgcc: %s` option in `ngJest` config',
    async (skipNgcc) => {
      console.log = jest.fn();

      await globalSetup(Object.create(null), {
        globals: {
          ngJest: {
            skipNgcc,
          },
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);

      expect(console.log).toHaveBeenCalled();
    },
  );
});
