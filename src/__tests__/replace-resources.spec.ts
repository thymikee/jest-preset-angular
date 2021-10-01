import { readFileSync } from 'fs';
import { join } from 'path';

import { SOURCE_MAPPING_PREFIX } from 'ts-jest/dist/compiler/compiler-utils';
import { ConfigSet } from 'ts-jest/dist/config/config-set';

import { NgJestCompiler } from '../compiler/ng-jest-compiler';
import { replaceResources } from '../transformers/replace-resources';

import { jestCfgStub } from './__helpers__/test-constants';
import { mockFolder } from './__helpers__/test-helpers';

const fileName1 = 'app.component.ts';
const fileName2 = 'foo.component.ts';
const fileName3 = 'icon.component.ts';
const filePath1 = join(mockFolder, 'app.component.ts');
const filePath2 = join(mockFolder, 'foo.component.ts');
const filePath3 = join(mockFolder, 'icon.component.ts');
const fileContent1 = readFileSync(filePath1, 'utf-8');
const fileContent2 = readFileSync(filePath2, 'utf-8');
const fileContent3 = readFileSync(filePath3, 'utf-8');
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

test.each([true, false])(
  'should keep styles/template and transform styleUrls/templateUrl to proper syntax for CommonJS/ESM',
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
    compiler._makeTransformers = jest.fn().mockReturnValue({
      before: [replaceResources(compiler)],
      after: [],
      afterDeclarations: [],
    });

    const output1 = compiler.getCompiledOutput(fileContent1, filePath1, {
      watchMode: false,
      supportsStaticESM: useESM,
      depGraphs: new Map(),
    });

    expect(output1.substring(0, output1.indexOf(SOURCE_MAPPING_PREFIX))).toMatchSnapshot(
      `${fileName1}-with-esm-${useESM}`,
    );

    const output2 = compiler.getCompiledOutput(fileContent2, filePath2, {
      watchMode: false,
      supportsStaticESM: useESM,
      depGraphs: new Map(),
    });

    expect(output2.substring(0, output2.indexOf(SOURCE_MAPPING_PREFIX))).toMatchSnapshot(
      `${fileName2}-with-esm-${useESM}`,
    );

    const output3 = compiler.getCompiledOutput(fileContent3, filePath3, {
      watchMode: false,
      supportsStaticESM: useESM,
      depGraphs: new Map(),
    });

    expect(output3.substring(0, output3.indexOf(SOURCE_MAPPING_PREFIX))).toMatchSnapshot(
      `${fileName3}-with-esm-${useESM}`,
    );
  },
);
