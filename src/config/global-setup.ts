import type { Config } from '@jest/types';

import { runNgccJestProcessor } from '../utils/ngcc-jest-processor';

interface NgJestProjectConfig extends Omit<Config.ProjectConfig, 'globals'> {
  globals: {
    ngJest?: {
      skipNgcc: boolean;
    };
  };
}

export = async (_globalConfig: Config.GlobalConfig, projectConfig: NgJestProjectConfig) => {
  if (!projectConfig.globals.ngJest?.skipNgcc) {
    runNgccJestProcessor();
  }
};
