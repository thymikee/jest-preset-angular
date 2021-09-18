/** @type {import('ts-jest/dist/types').ProjectConfigTsJest} */
module.exports = {
  displayName: 'with-babel',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/../tsconfig.json',
      babelConfig: true,
    },
  },
  transform: {
    '^.+\\.(ts|js|html)$': '<rootDir>/../../build/index.js',
  },
};
