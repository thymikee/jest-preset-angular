/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'jest-preset-angular/presets/defaults-esm',
  globals: {
    'ts-jest': {
      useESM: true,
      stringifyContentPathRegex: '\\.(html|svg)$',
      tsconfig: '<rootDir>/tsconfig-esm.spec.json',
    },
  },
  moduleNameMapper: {
    '^@app1/services/(.*)$': '<rootDir>/src/app/services/$1',
    tslib: 'tslib/tslib.es6.js',
  },
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};
