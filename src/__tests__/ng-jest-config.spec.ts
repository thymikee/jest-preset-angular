import { NgJestConfig } from '../config/ng-jest-config';
import { join } from 'path';

describe('NgJestConfig', () => {
  describe('readTsConfig', () => {
    test('should return config including Angular compiler config with tsconfig as a string from ts-jest option', () => {
      const configFilePath = join(__dirname, 'tsconfig-fake.json');
      const ngJestConfig = new NgJestConfig({
        globals: {
          'ts-jest': {
            tsconfig: configFilePath,
          },
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      const config = ngJestConfig.readTsConfig();

      expect(config.fileNames).toBeDefined();
      delete config.options.basePath;
      delete config.options.baseUrl;
      expect(config.options.configFilePath).toEqual(configFilePath);
      delete config.options.configFilePath;
      delete config.options.genDir;
      expect(config.options).toMatchSnapshot();
    });

    test('should return config including Angular compiler config with tsconfig as an object from ts-jest option', () => {
      const ngJestConfig = new NgJestConfig({
        cwd: __dirname,
        globals: {
          'ts-jest': {
            tsconfig: {
              resolveJsonModule: true,
            },
          },
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      const config = ngJestConfig.readTsConfig();

      expect(config.fileNames).toBeDefined();
      delete config.options.basePath;
      delete config.options.baseUrl;
      expect(config.options.configFilePath).toEqual(join(__dirname, 'tsconfig.json'));
      delete config.options.configFilePath;
      delete config.options.genDir;
      expect(config.options).toMatchSnapshot();
    });

    test('should return config including Angular compiler config without tsconfig defined in ts-jest option', () => {
      const ngJestConfig = new NgJestConfig(Object.create(null));
      const config = ngJestConfig.readTsConfig();

      expect(config.fileNames).toBeDefined();
      delete config.options.basePath;
      delete config.options.baseUrl;
      expect(config.options.configFilePath).toEqual(join(process.cwd(), 'tsconfig.json'));
      delete config.options.configFilePath;
      delete config.options.genDir;
      expect(config.options).toMatchSnapshot();
    });
  });
});
