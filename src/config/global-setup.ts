import type { Config } from '@jest/types';

import { ngJestPreprocessor } from '../compiler/ng-jest-preprocessor';
import { runNgccJestProcessor } from '../utils/ngcc-jest-processor';

let precompiledCount: number | undefined;

export = async (globalConfig: Config.GlobalConfig) => {
  const ngJestConfig = globalThis.ngJest;
  const tsconfig = ngJestConfig?.tsconfig;
  if (!ngJestConfig?.skipNgcc) {
    runNgccJestProcessor(tsconfig);
  }
  if (ngJestConfig.experimentalPrecompilation) {
    ngJestPreprocessor.performCompile(tsconfig);
    if (globalConfig.watch) {
      precompiledCount = precompiledCount === undefined ? 0 : precompiledCount + 1;
      process.env.precompiledCount = precompiledCount.toString();
    }
  }
};
