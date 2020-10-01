/** @typedef {import('ts-jest')} */
/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
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
    '<rootDir>/node_modules/jest-preset-angular/serializers/html-comment',
    '<rootDir>/node_modules/jest-preset-angular/serializers/ng-snapshot',
    '<rootDir>/node_modules/jest-preset-angular/serializers/no-ng-attributes',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png)$': '<rootDir>/__mocks__/image.js',
    '^@lib/(.*)$': '<rootDir>/src/lib/$1',
  },
  setupFilesAfterEnv: [
    '<rootDir>/setup-jest.ts',
  ],
};
