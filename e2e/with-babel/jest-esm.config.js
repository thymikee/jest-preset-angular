/** @type {import('ts-jest/dist/types').ProjectConfigTsJest} */
module.exports = {
  preset: '<rootDir>/../../node_modules/ts-jest/presets/js-with-babel-esm',
  globals: {
    'ts-jest': {
      useESM: true,
      tsconfig: 'tsconfig-esm.json',
      babelConfig: true,
    },
  },
  transform: {
    '^.+\\.(ts|js)$': '<rootDir>/../../build/index.js',
  },
};
