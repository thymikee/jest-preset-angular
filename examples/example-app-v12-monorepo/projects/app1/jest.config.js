require('jest-preset-angular/ngcc-jest-processor');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'jest-preset-angular',
  moduleNameMapper: {
    '^@app1/services/(.*)$': '<rootDir>/src/app/services/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};
