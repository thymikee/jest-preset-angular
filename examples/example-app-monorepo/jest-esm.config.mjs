globalThis.ngJest = {
  skipNgcc: false,
  tsconfig: 'tsconfig-esm.spec.json',
};

/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
const jestConfig = {
  globalSetup: 'jest-preset-angular/global-setup.mjs',
  projects: ['<rootDir>/apps/app1/jest-esm.config.mjs', '<rootDir>/libs/user/jest-esm.config.mjs'],
};

export default jestConfig;
