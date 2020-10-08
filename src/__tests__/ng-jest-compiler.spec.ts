import { join } from 'path';
import * as performCompile from '@angular/compiler-cli/src/perform_compile';

import { NgJestCompiler, SOURCE_MAPPING_PREFIX } from '../compiler/ng-jest-compiler';
import { NgJestConfig } from '../config/ng-jest-config';

const configFilePath = join(__dirname, 'tsconfig-ve.json');
const ngJestConfig = new NgJestConfig({
  globals: {
    'ts-jest': {
      tsconfig: configFilePath,
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any);

describe('NgJestCompiler', () => {
  test('should throw diagnostics error when initializing the compiler', () => {
    expect(() => new NgJestCompiler(ngJestConfig)).toThrowErrorMatchingSnapshot();
  });

  test('should return compiled result', () => {
    const fileName = join(__dirname, '__mocks__', 'app.component.ts');
    jest.spyOn(ngJestConfig, 'parsedTsConfig', 'get').mockReturnValueOnce({
      ...ngJestConfig.parsedTsConfig,
      rootNames: [fileName],
    });
    const compiler = new NgJestCompiler(ngJestConfig);
    jest.spyOn(performCompile, 'readConfiguration').mockReturnValueOnce({
      ...ngJestConfig.parsedTsConfig,
      rootNames: [fileName],
    });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const emitResult = compiler.getCompiledFile(fileName)!;

    expect(emitResult.substring(emitResult.indexOf(SOURCE_MAPPING_PREFIX))).not.toEqual('');
    // Source map is different based on file location which can fail on CI, so we only compare snapshot for js
    expect(emitResult.substring(0, emitResult.indexOf(SOURCE_MAPPING_PREFIX))).toMatchSnapshot();
  });

  test('should throw error for individual file on compiling', () => {
    const fileName = join(__dirname, '__mocks__', 'foo.component.ts');
    jest.spyOn(ngJestConfig, 'parsedTsConfig', 'get').mockReturnValueOnce({
      ...ngJestConfig.parsedTsConfig,
      rootNames: [],
    });
    const compiler = new NgJestCompiler(ngJestConfig);
    jest.spyOn(performCompile, 'readConfiguration').mockReturnValueOnce({
      ...ngJestConfig.parsedTsConfig,
      rootNames: [fileName],
    });

    expect(() => compiler.getCompiledFile(fileName)).toThrowErrorMatchingSnapshot();
  });
});
