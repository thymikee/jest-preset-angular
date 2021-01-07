import { readFileSync } from 'fs';
import { join } from 'path';

import { SOURCE_MAPPING_PREFIX } from 'ts-jest/dist/compiler/compiler-utils';

import { NgJestCompiler } from '../compiler/ng-jest-compiler';
import { NgJestConfig } from '../config/ng-jest-config';

import { jestCfgStub } from './__helpers__/test-constants';
import { mockFolder } from './__helpers__/test-helpers';

describe('Replace resources transformer', () => {
  const fileName = join(mockFolder, 'app.component.ts');
  const fileContent = readFileSync(fileName, 'utf-8');

  describe.each([true, false])('with isolatedModules %p', (isolatedModules) => {
    test.each([true, false])(
      'should use replaceResources transformer from @angular/compiler-cli with useESM %p',
      (useESM) => {
        const ngJestConfig = new NgJestConfig({
          ...jestCfgStub,
          globals: {
            'ts-jest': {
              ...jestCfgStub.globals['ts-jest'],
              isolatedModules,
              useESM,
            },
          },
        });
        const compiler = new NgJestCompiler(ngJestConfig, new Map());

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const emittedResult = compiler.getCompiledOutput(fileName, fileContent, useESM)!;

        // Source map is different based on file location which can fail on CI, so we only compare snapshot for js
        expect(emittedResult.substring(0, emittedResult.indexOf(SOURCE_MAPPING_PREFIX))).toMatchSnapshot();
      },
    );
  });
});
