/** @type {import('ts-jest/dist/types').ProjectConfigTsJest} */
module.exports = {
  displayName: 'async',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/../tsconfig.json',
    },
  },
  setupFilesAfterEnv: ['<rootDir>/../../setup-jest.js'],
  transform: { '^.+\\.(ts|js|html)$': '<rootDir>/../../build/index.js' },
};
