import type { Config } from '@jest/types';
import type { TsJestGlobalOptions } from 'ts-jest/dist/types';

import { runNgccJestProcessor } from '../utils/ngcc-jest-processor';

interface NgJestProjectConfig extends Omit<Config.ProjectConfig, 'globals'> {
  globals: {
    ngJest?: {
      skipNgcc: boolean;
    };
    tsJest?: TsJestGlobalOptions;
  };
}

export = async (_globalConfig: Config.GlobalConfig, { globals }: NgJestProjectConfig) => {
  if (!globals.ngJest?.skipNgcc) {
    const tsconfig = globals.tsJest?.tsconfig;
    runNgccJestProcessor(typeof tsconfig === 'string' ? tsconfig : undefined);
  }
};
