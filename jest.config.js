/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json',
      isolatedModules: true,
    },
  },
  moduleNameMapper: {
    '@angular/compiler-cli/ngcc': '<rootDir>/node_modules/@angular/compiler-cli/bundles/ngcc/main-ngcc.js',
  },
  modulePathIgnorePatterns: ['examples/.*', 'website/.*'],
  resolver: '<rootDir>/build/resolvers/ng-jest-resolver',
  snapshotSerializers: [require.resolve('jest-snapshot-serializer-raw')],
  testPathIgnorePatterns: [
    '/src/__tests__/__mocks__/',
    '/src/__tests__/__helpers__/',
    '/node_modules/',
    '/examples/',
    '/e2e/.*/__tests__',
    'e2e',
    '\\.snap$',
  ],
  transformIgnorePatterns: ['node_modules/(?!@angular)'],
  transform: {
    '^.+\\.(ts|js|mjs|html)$': '<rootDir>/build/index.js',
  },
};
