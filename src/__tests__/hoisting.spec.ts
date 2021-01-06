import { readFileSync } from 'fs';
import { join } from 'path';

import { SOURCE_MAPPING_PREFIX } from 'ts-jest/dist/compiler/compiler-utils';

import { NgJestCompiler } from '../compiler/ng-jest-compiler';
import { NgJestConfig } from '../config/ng-jest-config';

import { jestCfgStub } from './__helpers__/test-constants';

describe('Hoisting', () => {
  // Verify if we use `ts-jest` hoisting transformer
  test('should hoist correctly', () => {
    const ngJestConfig = new NgJestConfig(jestCfgStub);
    const fileName = join(__dirname, '__mocks__', 'foo.spec.ts');
    const compiler = new NgJestCompiler(ngJestConfig, new Map());

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const emittedResult = compiler.getCompiledOutput(fileName, readFileSync(fileName, 'utf-8'), false)!;

    // Source map is different based on file location which can fail on CI, so we only compare snapshot for js
    expect(emittedResult.substring(0, emittedResult.indexOf(SOURCE_MAPPING_PREFIX))).toMatchSnapshot();
  });
});
