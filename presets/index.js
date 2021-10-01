const snapshotSerializers = require('../build/serializers');

const basePreset = {
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|js|html|svg)$': 'jest-preset-angular',
  },
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
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
      tslib: 'tslib/tslib.es6.js',
    },
    transformIgnorePatterns: ['node_modules/(?!tslib)'],
  },
};
