require('./ngcc-jest-processor');

/** @type {import('ts-jest/dist/types').ProjectConfigTsJest} */
module.exports = {
  modulePathIgnorePatterns: ['examples', 'build', 'website', 'e2e'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json',
    },
  },
  moduleNameMapper: {
    '@angular/compiler-cli/ngcc': '<rootDir>/node_modules/@angular/compiler-cli/bundles/ngcc/main-ngcc.js',
  },
  resolver: '<rootDir>/build/resolvers/ng-jest-resolver',
  snapshotSerializers: [
    '<rootDir>/node_modules/pretty-format/build/plugins/ConvertAnsi.js',
    require.resolve('jest-snapshot-serializer-raw'),
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/examples/',
    '/e2e',
    '\\.snap$',
    '/build',
    '/src/__tests__/__mocks__/',
    '/src/__tests__/__helpers__/',
  ],
  transformIgnorePatterns: ['node_modules/(?!@angular)'],
  transform: {
    '^.+\\.(ts|js|mjs|html)$': '<rootDir>/build/index.js',
  },
};
