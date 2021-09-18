/** @type {import('ts-jest/dist/types').ProjectConfigTsJest} */
module.exports = {
  displayName: 'jest-globals',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/../tsconfig.json',
    },
  },
  injectGlobals: false,
  transform: { '^.+\\.(ts|js|html)$': '<rootDir>/../../build/index.js' },
};
