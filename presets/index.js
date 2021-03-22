const snapshotSerializers = require('../build/serializers');

const basePreset = {
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
    },
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|js|html)$': 'jest-preset-angular',
  },
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^app/(.*)$': '<rootDir>/src/app/$1',
    '^assets/(.*)$': '<rootDir>/src/assets/$1',
    '^environments/(.*)$': '<rootDir>/src/environments/$1',
  },
  snapshotSerializers,
};

module.exports = {
  defaults: basePreset,
  defaultsESM: {
    ...basePreset,
    extensionsToTreatAsEsm: ['.ts'],
    globals: {
      'ts-jest': {
        ...basePreset.globals['ts-jest'],
        useESM: true,
      },
    },
    moduleNameMapper: {
      ...basePreset.moduleNameMapper,
      tslib: '<rootDir>/node_modules/tslib/tslib.es6.js',
    },
    transformIgnorePatterns: ['node_modules/(?!tslib)'],
  },
};
