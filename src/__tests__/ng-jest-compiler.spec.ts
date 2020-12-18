import { readFileSync } from 'fs';
import { join } from 'path';
import { SOURCE_MAPPING_PREFIX } from 'ts-jest/dist/compiler/compiler-utils';
import ts from 'typescript';

import { NgJestCompiler } from '../compiler/ng-jest-compiler';
import { NgJestConfig } from '../config/ng-jest-config';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const jestCfgStub = {
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  testRegex: ['(/__tests__/.*|(\\\\.|/)(test|spec))\\\\.[jt]sx?$'],
  globals: {
    'ts-jest': {
      diagnostics: {
        pretty: false,
      },
    },
  },
} as any; // eslint-disable-line @typescript-eslint/no-explicit-any

describe('NgJestCompiler', () => {
  describe('with isolatedModules true', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let transpileModuleSpy: jest.SpyInstance<any>;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const baseJestCfg = {
      ...jestCfgStub,
      globals: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        'ts-jest': {
          ...jestCfgStub.globals['ts-jest'],
          isolatedModules: true,
        },
      },
    };

    beforeEach(() => {
      transpileModuleSpy = ts.transpileModule = jest.fn().mockReturnValueOnce({
        outputText: 'var foo = 1',
        diagnostics: [],
        sourceMapText: '{}',
      });
    });

    test('should call transpileModule with CommonJS module', () => {
      const ngJestConfig = new NgJestConfig(baseJestCfg);
      const fileName = join(__dirname, '__mocks__', 'foo.service.ts');
      const compiler = new NgJestCompiler(ngJestConfig, new Map());

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      compiler.getCompiledOutput(fileName, readFileSync(fileName, 'utf-8'), false)!;

      expect(transpileModuleSpy).toHaveBeenCalled();
      expect(transpileModuleSpy.mock.calls[0][1].compilerOptions.module).toEqual(ts.ModuleKind.CommonJS);
    });

    test('should call transpileModule with ESM module', () => {
      const ngJestConfig = new NgJestConfig({
        ...baseJestCfg,
        globals: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          'ts-jest': {
            ...baseJestCfg.globals['ts-jest'],
            useESM: true,
          },
        },
      });
      const fileName = join(__dirname, '__mocks__', 'foo.service.ts');
      const compiler = new NgJestCompiler(ngJestConfig, new Map());

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      compiler.getCompiledOutput(fileName, readFileSync(fileName, 'utf-8'), true)!;

      expect(transpileModuleSpy).toHaveBeenCalled();
      expect(transpileModuleSpy.mock.calls[0][1].compilerOptions.module).not.toEqual(ts.ModuleKind.CommonJS);
    });

    test('should use hoisting transformer from ts-jest', () => {
      const ngJestConfig = new NgJestConfig(baseJestCfg);
      const fileName = join(__dirname, '__mocks__', 'foo.spec.ts');
      ngJestConfig.parsedTsConfig = {
        ...ngJestConfig.parsedTsConfig,
        rootNames: [fileName],
      };
      const compiler = new NgJestCompiler(ngJestConfig, new Map());

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      compiler.getCompiledOutput(fileName, readFileSync(fileName, 'utf-8'), false)!;

      // Source map is different based on file location which can fail on CI, so we only compare snapshot for js
      expect(transpileModuleSpy.mock.calls[0][1].transformers).toMatchSnapshot();
    });
  });

  describe('with isolatedModule false', () => {
    const ngJestConfig = new NgJestConfig(jestCfgStub);

    test('should return compiled result for new file which is not known by Program', () => {
      const fileName = join(__dirname, '__mocks__', 'app.component.ts');
      ngJestConfig.parsedTsConfig = {
        ...ngJestConfig.parsedTsConfig,
        rootNames: [],
      };
      const compiler = new NgJestCompiler(ngJestConfig, new Map());

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const emittedResult = compiler.getCompiledOutput(fileName, readFileSync(fileName, 'utf-8'), false)!;

      // Source map is different based on file location which can fail on CI, so we only compare snapshot for js
      expect(emittedResult.substring(0, emittedResult.indexOf(SOURCE_MAPPING_PREFIX))).toMatchSnapshot();
    });

    test('should return compiled result for existing file which is known by Program', () => {
      const fileName = join(__dirname, '__mocks__', 'app.component.ts');
      ngJestConfig.parsedTsConfig = {
        ...ngJestConfig.parsedTsConfig,
        rootNames: [fileName],
      };
      const compiler = new NgJestCompiler(ngJestConfig, new Map());

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const emittedResult = compiler.getCompiledOutput(fileName, readFileSync(fileName, 'utf-8'), false)!;

      // Source map is different based on file location which can fail on CI, so we only compare snapshot for js
      expect(emittedResult.substring(0, emittedResult.indexOf(SOURCE_MAPPING_PREFIX))).toMatchSnapshot();
    });

    test('should throw diagnostics error for new file which is not known by Program', () => {
      const fileName = join(__dirname, '__mocks__', 'foo.component.ts');
      ngJestConfig.parsedTsConfig = {
        ...ngJestConfig.parsedTsConfig,
        rootNames: [],
      };
      const compiler = new NgJestCompiler(ngJestConfig, new Map());

      expect(() =>
        compiler.getCompiledOutput('foo.ts', readFileSync(fileName, 'utf-8'), false),
      ).toThrowErrorMatchingSnapshot();
    });

    test('should throw diagnostics error for existing file which is known by Program', () => {
      const fileName = join(__dirname, '__mocks__', 'foo.component.ts');
      ngJestConfig.parsedTsConfig = {
        ...ngJestConfig.parsedTsConfig,
        rootNames: [fileName],
      };
      const compiler = new NgJestCompiler(ngJestConfig, new Map());

      expect(() =>
        compiler.getCompiledOutput(fileName, readFileSync(fileName, 'utf-8'), false),
      ).toThrowErrorMatchingSnapshot();
    });

    test('should not throw diagnostics error when shouldReportDiagnostics return false', () => {
      const fileName = join(__dirname, '__mocks__', 'foo.component.ts');
      ngJestConfig.parsedTsConfig = {
        ...ngJestConfig.parsedTsConfig,
        rootNames: [fileName],
      };
      ngJestConfig.shouldReportDiagnostics = jest.fn().mockReturnValueOnce(false);
      const compiler = new NgJestCompiler(ngJestConfig, new Map());

      expect(() => compiler.getCompiledOutput(fileName, readFileSync(fileName, 'utf-8'), false)).not.toThrowError();
    });

    // Verify if we use `ts-jest` hoisting transformer
    test('should hoist correctly', () => {
      const fileName = join(__dirname, '__mocks__', 'foo.spec.ts');
      ngJestConfig.parsedTsConfig = {
        ...ngJestConfig.parsedTsConfig,
        rootNames: [fileName],
      };
      const compiler = new NgJestCompiler(ngJestConfig, new Map());

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const emittedResult = compiler.getCompiledOutput(fileName, readFileSync(fileName, 'utf-8'), false)!;

      // Source map is different based on file location which can fail on CI, so we only compare snapshot for js
      expect(emittedResult.substring(0, emittedResult.indexOf(SOURCE_MAPPING_PREFIX))).toMatchSnapshot();
    });
  });
});
