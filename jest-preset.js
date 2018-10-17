const { defaults } = require('ts-jest/presets')

module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/src/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      transformers:[
        // here should be the transformer file described in header of preprocess.js, for example:
        // require.resolve('./transformer')
      ]
    },
  },
  transform: {
    '\\.(ts|html)$': 'ts-jest',
  },
  testMatch: defaults.testMatch,
  moduleFileExtensions: defaults.moduleFileExtensions.concat(['html']),
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^app/(.*)$': '<rootDir>/src/app/$1',
    '^assets/(.*)$': '<rootDir>/src/assets/$1',
    '^environments/(.*)$': '<rootDir>/src/environments/$1',
  },
  transformIgnorePatterns: ['node_modules/(?!@ngrx)'],
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
}
