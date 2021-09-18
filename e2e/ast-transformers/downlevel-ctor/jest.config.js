/** @type {import('ts-jest/dist/types').ProjectConfigTsJest} */
module.exports = {
  displayName: 'ast-transformer',
  globals: {
    'ts-jest': {
      useESM: true,
      tsconfig: '<rootDir>/../../tsconfig.json',
    },
  },
  transform: { '^.+\\.(ts|js|html)$': '<rootDir>/../../../build/index.js' },
};
