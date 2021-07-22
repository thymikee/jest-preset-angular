import { readFileSync } from 'fs';
import { join } from 'path';

import { jest } from '@jest/globals';
import { ConfigSet } from 'ts-jest/dist/config/config-set';

import { NgJestCompiler } from '../compiler/ng-jest-compiler';

import { jestCfgStub } from './__helpers__/test-constants';
import { mockFolder } from './__helpers__/test-helpers';

const fileName = join(mockFolder, 'app.component.ts');
const fileContent = readFileSync(fileName, 'utf-8');

describe('NgJestCompiler', () => {
  describe.each([true, false])('with isolatedModules %p', (isolatedModules) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const baseJestCfg = {
      ...jestCfgStub,
      globals: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        'ts-jest': {
          ...jestCfgStub.globals['ts-jest'],
          isolatedModules,
          tsconfig: {
            esModuleInterop: false,
            allowSyntheticDefaultImports: false,
          },
        },
      },
    };

    test.each([true, false])(
      'should transform codes with useESM %p using hoisting, replace resources and downlevel ctor transformers',
      (useESM) => {
        const ngJestConfig = new ConfigSet({
          ...baseJestCfg,
          globals: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            'ts-jest': {
              ...baseJestCfg.globals['ts-jest'],
              useESM,
            },
          },
        });
        const compiler = new NgJestCompiler(ngJestConfig, new Map());
        // @ts-expect-error testing purpose
        const makeTransformersSpy = jest.spyOn(compiler, '_makeTransformers');

        compiler.getCompiledOutput(fileContent, fileName, {
          watchMode: false,
          supportsStaticESM: useESM,
          depGraphs: new Map(),
        });

        expect(makeTransformersSpy.mock.results[0].value).toMatchSnapshot();
      },
    );
  });
});
