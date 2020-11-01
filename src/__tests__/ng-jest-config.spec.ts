import { normalizeSeparators } from '@angular/compiler-cli/src/ngtsc/util/src/path';
import { join } from 'path';

import { NgJestConfig } from '../config/ng-jest-config';

describe('NgJestConfig', () => {
  describe('readTsConfig', () => {
    test('should return config including Angular compiler config with tsconfig as a string from ts-jest option', () => {
      const configFilePath = join(__dirname, 'tsconfig-ve.json');
      const ngJestConfig = new NgJestConfig({
        globals: {
          'ts-jest': {
            tsconfig: configFilePath,
          },
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      const config = ngJestConfig.parsedTsConfig;

      delete config.options.basePath;
      delete config.options.baseUrl;
      expect(config.options.configFilePath as string).toEqual(normalizeSeparators(configFilePath));
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
      expect(config.options.configFilePath as string).toEqual(
        normalizeSeparators(join(__dirname, '..', '..', 'tsconfig.json')),
      );
      delete config.options.configFilePath;
      delete config.options.genDir;
      expect(config.options).toMatchSnapshot();
    });

    test('should return config including Angular compiler config without tsconfig defined in ts-jest option', () => {
      const ngJestConfig = new NgJestConfig(Object.create(null));
      const config = ngJestConfig.parsedTsConfig;

      delete config.options.basePath;
      delete config.options.baseUrl;
      expect(config.options.configFilePath as string).toEqual(
        normalizeSeparators(join(__dirname, '..', '..', 'tsconfig.json')),
      );
      delete config.options.configFilePath;
      delete config.options.genDir;
      expect(config.options).toMatchSnapshot();
    });
  });
});
