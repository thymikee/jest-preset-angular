const jestCfg = require('./jest.config');

/** @type {import('ts-jest/dist/types').ProjectConfigTsJest} */
module.exports = {
  ...jestCfg,
  globals: {
    'ts-jest': {
      useESM: true,
      tsconfig: {
        ...require('../tsconfig-esm.json').compilerOptions,
        /**
         * Set at ES2018 to test Angular doesn't work with ES2017+
         * see https://github.com/angular/components/issues/21632#issuecomment-764975917
         */
        target: 'ES2018',
      },
    },
  },
  moduleNameMapper: {
    tslib: 'tslib/tslib.es6.js',
  },
  transformIgnorePatterns: ['node_modules/(?!tslib)'],
};
