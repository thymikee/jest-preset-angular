/** @type {import('ts-jest/dist/types').ProjectConfigTsJest} */
module.exports = {
  preset: '<rootDir>/../../../node_modules/ts-jest/presets/default-esm',
  globals: {
    'ts-jest': {
      useESM: true,
      tsconfig: 'tsconfig-esm.json',
    },
  },
  transform: {
    '^.+\\.(ts|js|html)$': '<rootDir>/../../../build/index.js',
  },
};
