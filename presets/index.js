const snapshotSerializers = require('../build/serializers');

const basePreset = {
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|css|sass|scss|less|styl)$',
    },
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|js|html|css|sass|scss|less|styl)$': 'jest-preset-angular',
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
      tslib: '<rootDir>/node_modules/tslib/tslib.es6.js',
    },
    transformIgnorePatterns: ['node_modules/(?!tslib)'],
  },
};
