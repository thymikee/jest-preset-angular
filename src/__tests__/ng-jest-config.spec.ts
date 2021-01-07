import { join } from 'path';

import { normalizeSeparators } from '@angular/compiler-cli/src/ngtsc/util/src/path';

import { NgJestConfig } from '../config/ng-jest-config';

describe('NgJestConfig', () => {
  const specifiedTsCfgPath = join(process.cwd(), 'tsconfig.spec.json');
  const defaultTsCfgPath = join(process.cwd(), 'tsconfig.json');

  describe('_resolveTsConfig', () => {
    test('should return config including Angular compiler config with tsconfig as a string from ts-jest option', () => {
      const ngJestConfig = new NgJestConfig({
        testMatch: [],
        testRegex: [],
        extensionsToTreatAsEsm: [],
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
      expect(config.options.configFilePath).toEqual(normalizeSeparators(specifiedTsCfgPath));
      delete config.options.configFilePath;
      delete config.options.genDir;
      expect(config.options).toMatchSnapshot();
    });

    test.each([
      {},
      {
        skipLibCheck: false,
      },
    ])(
      'should return config including Angular compiler config with tsconfig as an object from ts-jest option',
      (tsconfig) => {
        const ngJestConfig = new NgJestConfig({
          cwd: '.',
          testMatch: [],
          testRegex: [],
          extensionsToTreatAsEsm: [],
          globals: {
            'ts-jest': {
              tsconfig,
            },
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
        const config = ngJestConfig.parsedTsConfig;

        delete config.options.basePath;
        delete config.options.baseUrl;
        expect(config.options.configFilePath).toEqual(normalizeSeparators(defaultTsCfgPath));
        delete config.options.configFilePath;
        delete config.options.genDir;
        expect(config.options).toMatchSnapshot();
      },
    );

    test('should return config including Angular compiler config without tsconfig defined in ts-jest option', () => {
      const ngJestConfig = new NgJestConfig({
        testMatch: [],
        testRegex: [],
        extensionsToTreatAsEsm: [],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      const config = ngJestConfig.parsedTsConfig;

      delete config.options.basePath;
      delete config.options.baseUrl;
      expect(config.options.configFilePath).toEqual(normalizeSeparators(defaultTsCfgPath));
      delete config.options.configFilePath;
      delete config.options.genDir;
      expect(config.options).toMatchSnapshot();
    });
  });
});
