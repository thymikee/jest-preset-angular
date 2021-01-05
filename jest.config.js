require('./ngcc-jest-processor');

/** @type {import('ts-jest/dist/types').ProjectConfigTsJest} */
module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json',
    },
  },
  testPathIgnorePatterns: ['/e2e/', '/src/__tests__/__mocks__/', '/src/__tests__/__helpers__/'],
};
