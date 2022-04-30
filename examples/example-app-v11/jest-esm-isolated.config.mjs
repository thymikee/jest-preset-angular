import jestCfg from './jest-esm.config.mjs';

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const jestIsolatedCfg = {
  ...jestCfg,
  globals: {
    'ts-jest': {
      ...jestCfg.globals["ts-jest"],
      isolatedModules: true,
    },
  },
};

export default jestIsolatedCfg;
