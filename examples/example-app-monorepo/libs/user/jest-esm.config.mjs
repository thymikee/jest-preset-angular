import ngPreset from 'jest-preset-angular/presets/index.js';

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const jestConfig = {
  ...ngPreset.defaultsESM,
  displayName: 'user-lib',
  globals: {
    'ts-jest': {
      ...ngPreset.defaultsESM.globals["ts-jest"],
      tsconfig: '<rootDir>/tsconfig-esm.spec.json',
    },
  },
  moduleNameMapper: {
    tslib: 'tslib/tslib.es6.js',
    rxjs: '<rootDir>/../../node_modules/rxjs/dist/bundles/rxjs.umd.js',
  },
  setupFilesAfterEnv: ['<rootDir>/setup-jest-esm.ts'],
}

export default jestConfig;
