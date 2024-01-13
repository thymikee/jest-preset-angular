/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
  displayName: 'app1',
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  moduleNameMapper: {
    'libs/(.*)$': '<rootDir>/../../libs/$1',
  },
};
