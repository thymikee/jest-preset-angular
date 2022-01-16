/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  globalSetup: 'jest-preset-angular/global-setup',
  projects: ['<rootDir>/projects/app1', '<rootDir>/projects/app2'],
};
