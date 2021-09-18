require('./ngcc-jest-processor');

/** @type {import('ts-jest/dist/types').ProjectConfigTsJest} */
module.exports = {
  projects: [
    '<rootDir>',
    '<rootDir>/e2e/ast-transformers/downlevel-ctor',
    '<rootDir>/e2e/ast-transformers/hoisting',
    '<rootDir>/e2e/ast-transformers/replace-resources',
    '<rootDir>/e2e/async',
    '<rootDir>/e2e/custom-typings',
    '<rootDir>/e2e/jest-globals',
    '<rootDir>/e2e/snapshot-serializers',
    '<rootDir>/e2e/with-babel',
  ],
  modulePathIgnorePatterns: ['examples/.*', 'build', 'website/.*'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json',
    },
  },
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
  transform: {
    '^.+\\.(ts|js|html)$': '<rootDir>/build/index.js',
  },
};
