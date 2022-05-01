globalThis.ngJest = {
  skipNgcc: false,
  tsconfig: 'tsconfig-esm.spec.json',
};

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const jestConfig = {
  globalSetup: 'jest-preset-angular/global-setup',
  projects: ['<rootDir>/apps/app1/jest-esm-isolated.config.mjs', '<rootDir>/libs/user/jest-esm-isolated.config.mjs'],
};

export default jestConfig;
