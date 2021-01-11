require('jest-preset-angular/ngcc-jest-processor');

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  moduleNameMapper: {
    '\\.(jpg|jpeg|png)$': '<rootDir>/src/__tests__/__mocks__/image.js',
  },
  testMatch: [ '**/?(*.)+(spec|test).[jt]s?(x)' ],
  setupFilesAfterEnv: [
    '<rootDir>/setup-jest.ts',
  ],
}
