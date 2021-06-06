require('jest-preset-angular/ngcc-jest-processor');

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  displayName: 'app1',
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
};
