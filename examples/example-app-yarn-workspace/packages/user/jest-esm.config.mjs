import ngPreset from 'jest-preset-angular/presets/index.js';

globalThis.ngJest = {
  skipNgcc: false,
  tsconfig: 'tsconfig-esm.spec.json',
};

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const jestConfig = {
  ...ngPreset.defaultsESM,
  globals: {
    'ts-jest': {
      ...ngPreset.defaultsESM.globals["ts-jest"],
      tsconfig: '<rootDir>/tsconfig-esm.spec.json',
    },
  },
  globalSetup: 'jest-preset-angular/global-setup',
  moduleNameMapper: {
    tslib: 'tslib/tslib.es6.js',
    rxjs: '<rootDir>/../../node_modules/rxjs/dist/bundles/rxjs.umd.js',
  },
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
}

export default jestConfig;
