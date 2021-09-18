/** @type {import('ts-jest/dist/types').ProjectConfigTsJest} */
module.exports = {
  displayName: 'async',
  preset: '<rootDir>/../../node_modules/ts-jest/presets/default-esm',
  globals: {
    'ts-jest': {
      useESM: true,
      tsconfig: '<rootDir>/../tsconfig-esm.json',
    },
  },
  setupFilesAfterEnv: ['<rootDir>/../../setup-jest.js'],
  transform: { '^.+\\.(ts|js|html)$': '<rootDir>/../../build/index.js' },
};
