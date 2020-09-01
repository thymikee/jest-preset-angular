/** @typedef {import('ts-jest')} */
/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      astTransformers: {
        before: [
          'node_modules/jest-preset-angular/transformers/inline-files',
          'node_modules/jest-preset-angular/transformers/strip-styles',
        ],
      },
    },
  },
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  snapshotSerializers: [
    'jest-preset-angular/serializers/html-comment',
    'jest-preset-angular/serializers/ng-snapshot',
    'jest-preset-angular/serializers/no-ng-attributes',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/setup-jest.ts',
  ],
};
