import { readFileSync } from 'fs';
import { join } from 'path';

import { SOURCE_MAPPING_PREFIX } from 'ts-jest/dist/compiler/compiler-utils';

import { NgJestCompiler } from '../compiler/ng-jest-compiler';
import { NgJestConfig } from '../config/ng-jest-config';

import { jestCfgStub } from './__helpers__/test-constants';

describe('Downlevel ctor transformer', () => {
  const fileName = join(__dirname, '__mocks__', 'forward-ref.ts');
  const fileContent = readFileSync(fileName, 'utf-8');

  test.each([true, false])(
    'should/should not use downlevel ctor transformer from Angular for isolatedModules false/true',
    (isolatedModules) => {
      const ngJestConfig = new NgJestConfig({
        ...jestCfgStub,
        globals: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          'ts-jest': {
            ...jestCfgStub.globals['ts-jest'],
            isolatedModules,
          },
        },
      });
      const compiler = new NgJestCompiler(ngJestConfig, new Map());

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const emittedResult = compiler.getCompiledOutput(fileName, fileContent, false)!;

      // Source map is different based on file location which can fail on CI, so we only compare snapshot for js
      expect(emittedResult.substring(0, emittedResult.indexOf(SOURCE_MAPPING_PREFIX))).toMatchSnapshot();
    },
  );
});
