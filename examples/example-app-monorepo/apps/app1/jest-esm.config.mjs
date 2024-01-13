import ngPreset from 'jest-preset-angular/presets/index.js';

/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
const jestConfig = {
  ...ngPreset.defaultsESM,
  displayName: 'app1',
  moduleNameMapper: {
    tslib: 'tslib/tslib.es6.js',
    rxjs: '<rootDir>/../../node_modules/rxjs/dist/bundles/rxjs.umd.js',
    'libs/(.*)$': '<rootDir>/../../libs/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/setup-jest-esm.ts'],
  transform: {
    '^.+\\.(ts|js|html|svg)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig-esm.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
        useESM: true,
      },
    ],
  },
};

export default jestConfig;
