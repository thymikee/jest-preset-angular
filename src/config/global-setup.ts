import { runNgccJestProcessor } from '../utils/ngcc-jest-processor';

const GlobalSetup = () => {
  const ngJestConfig = globalThis.ngJest;
  const tsconfig = ngJestConfig?.tsconfig;
  if (!ngJestConfig?.skipNgcc) {
    runNgccJestProcessor(tsconfig);
  }
}

export default GlobalSetup;
