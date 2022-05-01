globalThis.ngJest = {
  skipNgcc: false,
  experimentalPrecompilation: false,
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
  globalSetup: 'jest-preset-angular/global-setup',
  resolver: 'jest-preset-angular/build/resolvers/ng-jest-resolver',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
}

export default jestConfig;
