import { join } from 'path';

import { NgJestConfig } from '../config/ng-jest-config';

describe('NgJestConfig', () => {
  const specifiedTsCfgPath = join(__dirname, '..', '..', 'tsconfig.spec.json');
  const defaultTsCfgPath = join(__dirname, '..', '..', 'tsconfig.json');

  describe('readTsConfig', () => {
    test('should return config including Angular compiler config with tsconfig as a string from ts-jest option', () => {
      const ngJestConfig = new NgJestConfig({
        globals: {
          'ts-jest': {
            tsconfig: specifiedTsCfgPath,
          },
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      const config = ngJestConfig.parsedTsConfig;

      delete config.options.basePath;
      delete config.options.baseUrl;
      expect(config.options.configFilePath).toEqual(specifiedTsCfgPath);
      delete config.options.configFilePath;
      delete config.options.genDir;
      expect(config.options).toMatchSnapshot();
    });

    test('should return config including Angular compiler config with tsconfig as an object from ts-jest option', () => {
      const ngJestConfig = new NgJestConfig({
        cwd: '.',
        globals: {
          'ts-jest': {
            tsconfig: {
              resolveJsonModule: true,
            },
          },
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      const config = ngJestConfig.parsedTsConfig;

      delete config.options.basePath;
      delete config.options.baseUrl;
      expect(config.options.configFilePath).toEqual(defaultTsCfgPath);
      delete config.options.configFilePath;
      delete config.options.genDir;
      expect(config.options).toMatchSnapshot();
    });

    test('should return config including Angular compiler config without tsconfig defined in ts-jest option', () => {
      const ngJestConfig = new NgJestConfig(Object.create(null));
      const config = ngJestConfig.parsedTsConfig;

      delete config.options.basePath;
      delete config.options.baseUrl;
      expect(config.options.configFilePath).toEqual(defaultTsCfgPath);
      delete config.options.configFilePath;
      delete config.options.genDir;
      expect(config.options).toMatchSnapshot();
    });
  });
});
