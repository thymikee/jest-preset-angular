import { runNgccJestProcessor } from '../utils/ngcc-jest-processor';

export const globalSetup = async () => {
  const ngJestConfig = globalThis.ngJest;
  const tsconfig = ngJestConfig?.tsconfig;
  if (!ngJestConfig?.skipNgcc) {
    runNgccJestProcessor(tsconfig);
  }
};
