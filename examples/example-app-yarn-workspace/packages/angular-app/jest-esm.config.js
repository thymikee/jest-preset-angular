require('jest-preset-angular/ngcc-jest-processor');
const snapshotSerializers = require('jest-preset-angular/build/serializers/index');

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  preset: 'jest-preset-angular/presets/defaults-esm',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig-esm.spec.json',
      stringifyContentPathRegex: '\\.html$',
    },
  },
  snapshotSerializers,
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};
