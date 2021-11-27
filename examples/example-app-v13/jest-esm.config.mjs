globalThis.ngJest = {
  skipNgcc: false,
  experimentalPrecompilation: true,
  tsconfig: 'tsconfig-esm.spec.json',
}

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const jestConfig = {
  preset: 'jest-preset-angular/presets/defaults-esm',
  globals: {
    'ts-jest': {
      useESM: true,
      stringifyContentPathRegex: '\\.(html|svg)$',
      tsconfig: '<rootDir>/tsconfig-esm.spec.json',
    },
  },
  moduleNameMapper: {
    tslib: 'tslib/tslib.es6.js',
    rxjs: '<rootDir>/node_modules/rxjs/dist/bundles/rxjs.umd.js',
  },
  globalSetup: 'jest-preset-angular/global-setup',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
}

export default jestConfig;
