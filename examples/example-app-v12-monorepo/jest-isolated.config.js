// eslint-disable-next-line no-undef
globalThis.ngJest = {
  skipNgcc: false,
  tsconfig: 'tsconfig.spec.json',
};

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  globalSetup: 'jest-preset-angular/global-setup',
  projects: ['<rootDir>/projects/app1/jest-isolated.config.js', '<rootDir>/projects/app2/jest-isolated.config.js'],
};
