import { readFileSync } from 'fs';
import { join } from 'path';

import { jest } from '@jest/globals';
import { SOURCE_MAPPING_PREFIX } from 'ts-jest/dist/compiler/compiler-utils';
import ts from 'typescript';

import { NgJestCompiler } from '../compiler/ng-jest-compiler';
import { NgJestConfig } from '../config/ng-jest-config';

import { jestCfgStub } from './__helpers__/test-constants';
import { mockFolder } from './__helpers__/test-helpers';

describe('NgJestCompiler', () => {
  describe('with isolatedModules true', () => {
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

    test.each([true, false])('should call transpileModule with useESM %p', (useESM) => {
      const ngJestConfig = new NgJestConfig({
        ...baseJestCfg,
        globals: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          'ts-jest': {
            ...baseJestCfg.globals['ts-jest'],
            useESM,
            tsconfig: {
              esModuleInterop: false,
              allowSyntheticDefaultImports: false,
            },
          },
        },
      });
      const fileName = join(mockFolder, 'foo.service.ts');
      const compiler = new NgJestCompiler(ngJestConfig, new Map());
      // @ts-expect-error testing purpose
      compiler._transpileModule = jest.fn().mockReturnValueOnce({
        outputText: 'var foo = 1',
        diagnostics: [],
        sourceMapText: '{}',
      });

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      compiler.getCompiledOutput(fileName, readFileSync(fileName, 'utf-8'), useESM)!;

      // @ts-expect-error testing purpose
      expect(compiler._transpileModule).toHaveBeenCalled();
      // @ts-expect-error testing purpose
      const { module, esModuleInterop, allowSyntheticDefaultImports } = compiler._transpileModule.mock.calls[0][1]
        .compilerOptions as ts.CompilerOptions;
      if (useESM) {
        expect(module).not.toEqual(ts.ModuleKind.CommonJS);
        // verify if allowSyntheticDefaultImports is hardcoded to true
        expect(allowSyntheticDefaultImports).toEqual(true);
        // verify if esModuleInterop is hardcoded to true
        expect(esModuleInterop).toEqual(true);
      } else {
        expect(module).toEqual(ts.ModuleKind.CommonJS);
      }
      // @ts-expect-error _initialCompilerOptions is a private property
      expect(compiler._initialCompilerOptions.esModuleInterop).not.toEqual(true);
      // @ts-expect-error _initialCompilerOptions is a private property
      expect(compiler._initialCompilerOptions.allowSyntheticDefaultImports).not.toEqual(true);
    });
  });

  describe('with isolatedModule false', () => {
    const sourceMapStub =
      '{"version":3,"file":"app.component.js","sourceRoot":"","sources":["app.component.ts"],"names":[],"mappings":";;;;AAAA,wCAA0C;IAO7B,YAAY,SAAZ,YAAY;;QACvB,UAAK,GAAG,cAAc,CAAC;IACzB,CAAC;CAAA,CAAA;AAFY,YAAY;IALxB,gBAAS,CAAC;QACT,QAAQ,EAAE,UAAU;QACpB,WAAW,EAAE,sBAAsB;QACnC,SAAS,EAAE,CAAC,sBAAsB,CAAC;KACpC,CAAC;GACW,YAAY,CAExB;AAFY,oCAAY","sourcesContent":["import { Component } from \'@angular/core\';\\n\\n@Component({\\n  selector: \'app-root\',\\n  templateUrl: \'./app.component.html\',\\n  styleUrls: [\'./app.component.scss\'],\\n})\\nexport class AppComponent {\\n  title = \'test-app-v10\';\\n}\\n"]}';
    const compiledOutputStub =
      '"use strict";\n' +
      'Object.defineProperty(exports, "__esModule", { value: true });\n' +
      'exports.AppComponent = void 0;\n' +
      'const tslib_1 = require("tslib");\n' +
      'const core_1 = require("@angular/core");\n' +
      'let AppComponent = class AppComponent {\n' +
      '    constructor() {\n' +
      "        this.title = 'test-app-v10';\n" +
      '    }\n' +
      '};\n' +
      'AppComponent = tslib_1.__decorate([\n' +
      '    core_1.Component({\n' +
      "        selector: 'app-root',\n" +
      "        templateUrl: './app.component.html',\n" +
      "        styleUrls: ['./app.component.scss'],\n" +
      '    })\n' +
      '], AppComponent);\n' +
      'exports.AppComponent = AppComponent;\n' +
      '//# sourceMappingURL=app.component.js.map\n';

    const noErrorFileName = join(mockFolder, 'app.component.ts');
    const noErrorFileContent = readFileSync(noErrorFileName, 'utf-8');
    const hasErrorFileName = join(mockFolder, 'foo.component.ts');
    const hasErrorFileContent = readFileSync(hasErrorFileName, 'utf-8');

    test.each([noErrorFileName, undefined])(
      'should return compiled result for new file which is not known or known by Program',
      (fileName) => {
        const ngJestConfig = new NgJestConfig(jestCfgStub);
        ngJestConfig.parsedTsConfig = {
          ...ngJestConfig.parsedTsConfig,
          rootNames: fileName ? [fileName] : [],
        };
        const compiler = new NgJestCompiler(ngJestConfig, new Map());
        // @ts-expect-error bypass type checking to access private property
        compiler._tsHost.getEmittedResult = jest.fn().mockReturnValueOnce([compiledOutputStub, sourceMapStub]);

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        compiler.getCompiledOutput(noErrorFileName, noErrorFileContent, false)!;

        // @ts-expect-error bypass type checking to access private property
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(compiler._tsHost.getEmittedResult).toHaveBeenCalled();
      },
    );

    test('should compile codes with useESM true', () => {
      const ngJestConfig = new NgJestConfig({
        ...jestCfgStub,
        globals: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          'ts-jest': {
            ...jestCfgStub.globals['ts-jest'],
            useESM: true,
            tsconfig: {
              esModuleInterop: false,
              allowSyntheticDefaultImports: false,
            },
          },
        },
      });
      const compiler = new NgJestCompiler(ngJestConfig, new Map());

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const emittedResult = compiler.getCompiledOutput(noErrorFileName, noErrorFileContent, true)!;

      // Source map is different based on file location which can fail on CI, so we only compare snapshot for js
      expect(emittedResult.substring(0, emittedResult.indexOf(SOURCE_MAPPING_PREFIX))).toMatchSnapshot();
      // @ts-expect-error _compilerOptions is a private property
      expect(compiler._compilerOptions.esModuleInterop).toEqual(true);
      // @ts-expect-error _compilerOptions is a private property
      expect(compiler._compilerOptions.allowSyntheticDefaultImports).toEqual(true);
      // @ts-expect-error _initialCompilerOptions is a private property
      expect(compiler._initialCompilerOptions.esModuleInterop).not.toEqual(true);
      // @ts-expect-error _initialCompilerOptions is a private property
      expect(compiler._initialCompilerOptions.allowSyntheticDefaultImports).not.toEqual(true);
    });

    test.each([hasErrorFileName, undefined])('should throw diagnostics error for new file which is', (fileName) => {
      const ngJestConfig = new NgJestConfig(jestCfgStub);
      ngJestConfig.parsedTsConfig = {
        ...ngJestConfig.parsedTsConfig,
        rootNames: fileName ? [fileName] : [],
      };
      const compiler = new NgJestCompiler(ngJestConfig, new Map());

      expect(() =>
        compiler.getCompiledOutput(hasErrorFileName, hasErrorFileContent, false),
      ).toThrowErrorMatchingSnapshot(fileName ? 'known by Program' : 'not known by Program');
    });

    test('should not throw diagnostics error when shouldReportDiagnostics return false', () => {
      const ngJestConfig = new NgJestConfig(jestCfgStub);
      ngJestConfig.parsedTsConfig = {
        ...ngJestConfig.parsedTsConfig,
        rootNames: [hasErrorFileName],
      };
      // @ts-expect-error testing purpose
      ngJestConfig.shouldReportDiagnostics = jest.fn().mockReturnValueOnce(false);
      const compiler = new NgJestCompiler(ngJestConfig, new Map());

      expect(() => compiler.getCompiledOutput(hasErrorFileName, hasErrorFileContent, false)).not.toThrowError();
    });
  });
});
