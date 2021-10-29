/** @type {import('ts-jest/dist/types').ProjectConfigTsJest} */
module.exports = {
  displayName: 'async',
  globals: {
    'ts-jest': {
      tsconfig: {
        ...require('../tsconfig.json').compilerOptions,
        /**
         * Set at ES2018 to test Angular doesn't work with ES2017+
         * see https://github.com/angular/components/issues/21632#issuecomment-764975917
         */
        target: 'ES2018',
      },
    },
  },
  resolver: '<rootDir>/../../build/resolvers/ng-jest-resolver',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/../../setup-jest.js'],
  transform: { '^.+\\.(ts|mjs|js|html)$': '<rootDir>/../../build/index.js' },
  transformIgnorePatterns: ['node_modules/(?!@angular)'],
};
