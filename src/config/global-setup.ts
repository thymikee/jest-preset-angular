import { runNgccJestProcessor } from '../utils/ngcc-jest-processor';

export = async () => {
  const ngJestConfig = globalThis.ngJest;
  const tsconfig = ngJestConfig?.tsconfig;
  if (!ngJestConfig?.skipNgcc) {
    runNgccJestProcessor(tsconfig);
  }
};
