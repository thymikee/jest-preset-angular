import { NgJestConfig } from '../config/ng-jest-config';

describe('AngularJestTransformer', () => {
  describe('configsFor', () => {
    test('should return config set which is an instance of NgJestConfig', () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      expect(require('../').configsFor(Object.create(null))).toBeInstanceOf(NgJestConfig);
    });

    test('should return the same config-set for same values with jest config string in configSetItems', () => {
      const obj1 = {
        cwd: '.',
        globals: {
          'ts-jest': {
            resolveJsonModule: true,
          },
        },
      };
      const obj2 = { ...obj1 };

      // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-explicit-any
      expect(require('../').configsFor(obj2 as any)).toBe(require('../').configsFor(obj1 as any));
    });
  });
});
