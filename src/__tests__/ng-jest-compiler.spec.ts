import { readFileSync } from 'fs';
import { join } from 'path';
import { SOURCE_MAPPING_PREFIX } from 'ts-jest/dist/compiler/instance';

import { NgJestCompiler } from '../compiler/ng-jest-compiler';
import { NgJestConfig } from '../config/ng-jest-config';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const jestCfgStub = {
  globals: {
    'ts-jest': {
      diagnostics: {
        pretty: false,
      },
    },
  },
} as any; // eslint-disable-line @typescript-eslint/no-explicit-any
const ngJestConfig = new NgJestConfig(jestCfgStub);

function executeHoistingTest() {
  // Verify if we use `ts-jest` hoisting transformer
  test('should hoist correctly', () => {
    const fileName = join(__dirname, '__mocks__', 'foo.spec.ts');
    ngJestConfig.parsedTsConfig = {
      ...ngJestConfig.parsedTsConfig,
      rootNames: [fileName],
    };
    const compiler = new NgJestCompiler(ngJestConfig);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const emitResult = compiler.getCompiledOutput(fileName, readFileSync(fileName, 'utf-8'))!;

    // Source map is different based on file location which can fail on CI, so we only compare snapshot for js
    expect(emitResult.substring(0, emitResult.indexOf(SOURCE_MAPPING_PREFIX))).toMatchSnapshot();
  });
}

describe('NgJestCompiler', () => {
  describe('with isolatedModules true', () => {
    // Isolated modules true doesn't have downlevel ctor so this snapshot test should produce different input than with Program
    test('should return result when using isolatedModules true', () => {
      const fileName = join(__dirname, '__mocks__', 'foo.service.ts');
      const compiler = new NgJestCompiler(
        new NgJestConfig({
          globals: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            'ts-jest': {
              ...jestCfgStub.globals['ts-jest'],
              isolatedModules: true,
            },
          },
        } as any), // eslint-disable-line @typescript-eslint/no-explicit-any
      );

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const emitResult = compiler.getCompiledOutput(fileName, readFileSync(fileName, 'utf-8'))!;

      // Source map is different based on file location which can fail on CI, so we only compare snapshot for js
      expect(emitResult.substring(0, emitResult.indexOf(SOURCE_MAPPING_PREFIX))).toMatchSnapshot();
    });

    executeHoistingTest();
  });

  describe('with isolatedModule false', () => {
    test('should return compiled result for new file which is not known by Program', () => {
      const fileName = join(__dirname, '__mocks__', 'app.component.ts');
      ngJestConfig.parsedTsConfig = {
        ...ngJestConfig.parsedTsConfig,
        rootNames: [],
      };
      const compiler = new NgJestCompiler(ngJestConfig);

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const emitResult = compiler.getCompiledOutput(fileName, readFileSync(fileName, 'utf-8'))!;

      // Source map is different based on file location which can fail on CI, so we only compare snapshot for js
      expect(emitResult.substring(0, emitResult.indexOf(SOURCE_MAPPING_PREFIX))).toMatchSnapshot();
    });

    test('should return compiled result for existing file which is known by Program', () => {
      const fileName = join(__dirname, '__mocks__', 'app.component.ts');
      ngJestConfig.parsedTsConfig = {
        ...ngJestConfig.parsedTsConfig,
        rootNames: [fileName],
      };
      const compiler = new NgJestCompiler(ngJestConfig);

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const emitResult = compiler.getCompiledOutput(fileName, readFileSync(fileName, 'utf-8'))!;

      // Source map is different based on file location which can fail on CI, so we only compare snapshot for js
      expect(emitResult.substring(0, emitResult.indexOf(SOURCE_MAPPING_PREFIX))).toMatchSnapshot();
    });

    test('should throw diagnostics error for new file which is not known by Program', () => {
      const fileName = join(__dirname, '__mocks__', 'foo.component.ts');
      ngJestConfig.parsedTsConfig = {
        ...ngJestConfig.parsedTsConfig,
        rootNames: [],
      };
      const compiler = new NgJestCompiler(ngJestConfig);

      expect(() =>
        compiler.getCompiledOutput('foo.ts', readFileSync(fileName, 'utf-8')),
      ).toThrowErrorMatchingSnapshot();
    });

    test('should throw diagnostics error for existing file which is known by Program', () => {
      const fileName = join(__dirname, '__mocks__', 'foo.component.ts');
      ngJestConfig.parsedTsConfig = {
        ...ngJestConfig.parsedTsConfig,
        rootNames: [fileName],
      };
      const compiler = new NgJestCompiler(ngJestConfig);

      expect(() =>
        compiler.getCompiledOutput(fileName, readFileSync(fileName, 'utf-8')),
      ).toThrowErrorMatchingSnapshot();
    });

    test('should not throw diagnostics error when shouldReportDiagnostics return false', () => {
      const fileName = join(__dirname, '__mocks__', 'foo.component.ts');
      ngJestConfig.parsedTsConfig = {
        ...ngJestConfig.parsedTsConfig,
        rootNames: [fileName],
      };
      ngJestConfig.shouldReportDiagnostics = jest.fn().mockReturnValueOnce(false);
      const compiler = new NgJestCompiler(ngJestConfig);

      expect(() => compiler.getCompiledOutput(fileName, readFileSync(fileName, 'utf-8'))).not.toThrowError();
    });

    executeHoistingTest();

    /**
     * This test is copied from https://github.com/angular/angular/blob/master/packages/compiler-cli/test/transformers/downlevel_decorators_transform_spec.ts
     * Only one test is enough to verify that our NgJestCompiler does use Angular downlevel ctor transformer.
     */
    test('should downlevel decorators for @Injectable decorated class', () => {
      const fileName = join(__dirname, '__mocks__', 'foo.service.ts');
      ngJestConfig.parsedTsConfig = {
        ...ngJestConfig.parsedTsConfig,
        rootNames: [fileName],
      };
      const compiler = new NgJestCompiler(ngJestConfig);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const emitResult = compiler.getCompiledOutput(fileName, readFileSync(fileName, 'utf-8'))!;

      // Source map is different based on file location which can fail on CI, so we only compare snapshot for js
      expect(emitResult.substring(0, emitResult.indexOf(SOURCE_MAPPING_PREFIX))).toMatchSnapshot();
    });
  });
});
