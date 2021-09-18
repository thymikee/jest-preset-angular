/** @type {import('ts-jest/dist/types').ProjectConfigTsJest} */
module.exports = {
  displayName: 'hoisting',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/../../tsconfig.json',
    },
  },
  transform: { '^.+\\.(ts|js|html)$': '<rootDir>/../../../build/index.js' },
};
