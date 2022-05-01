globalThis.ngJest = {
  skipNgcc: false,
  tsconfig: 'tsconfig-esm.spec.json',
  experimentalPrecompilation: true,
};

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const jestConfig = {
  globalSetup: 'jest-preset-angular/global-setup',
  projects: ['<rootDir>/projects/app1/jest-esm-isolated.config.mjs', '<rootDir>/projects/app2/jest-esm-isolated.config.mjs'],
};

export default jestConfig;
