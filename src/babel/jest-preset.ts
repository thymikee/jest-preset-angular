import { DefaultOptions } from '@jest/types/build/Config';

const babelPreset: Partial<DefaultOptions> = {
  transform: {
    '^.+\\.(html)$': 'jest-preset-angular/build/babel/load-html-transformer',
    '^.+\\.(ts|js)$': 'babel-jest'
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

export = babelPreset;
