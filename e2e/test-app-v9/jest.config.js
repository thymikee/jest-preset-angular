require('jest-preset-angular/ngcc-jest-processor');

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  preset: 'jest-preset-angular',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png)$': '<rootDir>/__mocks__/image.js',
    '^@lib/(.*)$': '<rootDir>/src/lib/$1',
  },
  setupFilesAfterEnv: [
    '<rootDir>/setup-jest.ts',
  ],
};
