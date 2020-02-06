import { DefaultOptions } from '@jest/types/build/Config';

const tsJestPreset: Partial<DefaultOptions> = {
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      astTransformers: [
        'jest-preset-angular/build/ts-jest/InlineFilesTransformer',
        'jest-preset-angular/build/ts-jest/StripStylesTransformer',
      ],
    },
  },
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  testEnvironment: 'jest-environment-jsdom-fifteen',
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^app/(.*)$': '<rootDir>/src/app/$1',
    '^assets/(.*)$': '<rootDir>/src/assets/$1',
    '^environments/(.*)$': '<rootDir>/src/environments/$1',
  },
  transformIgnorePatterns: ['node_modules/(?!@ngrx)'],
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};

export = tsJestPreset;
