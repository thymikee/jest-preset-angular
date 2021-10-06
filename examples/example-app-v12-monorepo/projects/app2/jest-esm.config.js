require('jest-preset-angular/ngcc-jest-processor');

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  displayName: 'app2',
  preset: 'jest-preset-angular/presets/defaults-esm',
  globals: {
    'ts-jest': {
      useESM: true,
      stringifyContentPathRegex: '\\.(html|svg)$',
      tsconfig: '<rootDir>/tsconfig-esm.spec.json',
    },
  },
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
};
