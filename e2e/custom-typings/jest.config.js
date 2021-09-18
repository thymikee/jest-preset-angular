/** @type {import('ts-jest/dist/types').ProjectConfigTsJest} */
module.exports = {
  displayName: 'custom-typings',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/../tsconfig.json',
    },
  },
  transform: { '^.+\\.(ts|js|html)$': '<rootDir>/../../build/index.js' },
};
