import { readFileSync } from 'fs';
import { join } from 'path';

import { SOURCE_MAPPING_PREFIX } from 'ts-jest/dist/compiler/compiler-utils';

import { NgJestCompiler } from '../compiler/ng-jest-compiler';
import { NgJestConfig } from '../config/ng-jest-config';
import { constructorDownlevelCtor } from '../transformers/downlevel-ctor';

import { jestCfgStub } from './__helpers__/test-constants';
import { mockFolder } from './__helpers__/test-helpers';

const fileName = join(mockFolder, 'forward-ref.ts');
const filePath = readFileSync(fileName, 'utf-8');
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const baseJestCfg = {
  ...jestCfgStub,
  globals: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    'ts-jest': {
      ...jestCfgStub.globals['ts-jest'],
      tsconfig: {
        esModuleInterop: false,
        allowSyntheticDefaultImports: false,
      },
    },
  },
};

test.each([true, false])('should add ctor param to class constructor', (useESM) => {
  const ngJestConfig = new NgJestConfig({
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
  compiler._makeTransformers = jest.fn().mockReturnValue({
    before: [constructorDownlevelCtor(compiler)],
    after: [],
    afterDeclarations: [],
  });

  const output = compiler.getCompiledOutput(filePath, fileName, {
    watchMode: false,
    supportsStaticESM: useESM,
    depGraphs: new Map(),
  });

  expect(output.substring(0, output.indexOf(SOURCE_MAPPING_PREFIX))).toMatchSnapshot();
});
