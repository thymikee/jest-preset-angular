const snapshotSerializers = require('../build/serializers');

const basePreset = {
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
  resolver: 'jest-preset-angular/build/resolvers/ng-jest-resolver.js',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  snapshotSerializers,
};

module.exports = {
  defaults: {
    ...basePreset,
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
    transform: {
      '^.+\\.(ts|js|mjs|html|svg)$': 'jest-preset-angular',
    },
  },
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
    transform: {
      '^.+\\.(ts|js|html|svg)$': 'jest-preset-angular',
    },
    transformIgnorePatterns: ['node_modules/(?!tslib)'],
  },
};
