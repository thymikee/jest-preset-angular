/** @type {import('ts-jest/dist/types').ProjectConfigTsJest} */
module.exports = {
  preset: '<rootDir>/../../../node_modules/ts-jest/presets/default-esm',
  globals: {
    'ts-jest': {
      useESM: true,
      tsconfig: 'tsconfig-esm.json',
      stringifyContentPathRegex: '\\.html$',
    },
  },
  setupFilesAfterEnv: ['<rootDir>/../../../setup-jest.js'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|js|html)$': '<rootDir>/../../../build/index.js',
  },
};
