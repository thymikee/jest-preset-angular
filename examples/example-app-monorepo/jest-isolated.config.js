// eslint-disable-next-line no-undef
globalThis.ngJest = {
  skipNgcc: false,
  tsconfig: 'tsconfig.spec.json',
};

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  globalSetup: 'jest-preset-angular/global-setup',
  projects: ['<rootDir>/apps/app1/jest-isolated.config.js', '<rootDir>/libs/user/jest-isolated.config.js'],
};
