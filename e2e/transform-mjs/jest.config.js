/** @type {import('ts-jest/dist/types').ProjectConfigTsJest} */
module.exports = {
  displayName: 'transform-mjs',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/../tsconfig.json',
    },
  },
  transform: {
    '^.+\\.(ts|js|mjs|html)$': '<rootDir>/../../build/index.js',
  },
};
