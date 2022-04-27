/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const jestConfig = {
  globalSetup: 'jest-preset-angular/global-setup',
  projects: ['<rootDir>/projects/app1/jest-esm.config.mjs', '<rootDir>/projects/app2/jest-esm.config.mjs'],
};

export default jestConfig;
