import { runNgccJestProcessor } from '../utils/ngcc-jest-processor';

const globalSetup = async () => {
  const ngJestConfig = globalThis.ngJest;
  const tsconfig = ngJestConfig?.tsconfig;
  if (!ngJestConfig?.skipNgcc) {
    runNgccJestProcessor(tsconfig);
  }
};

export default globalSetup;
