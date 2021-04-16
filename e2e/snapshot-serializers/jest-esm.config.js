/** @type {import('ts-jest/dist/types').ProjectConfigTsJest} */
module.exports = {
  preset: '<rootDir>/../../node_modules/ts-jest/presets/default-esm',
  globals: {
    'ts-jest': {
      useESM: true,
      tsconfig: 'tsconfig-esm.json',
      stringifyContentPathRegex: '\\.(html|scss)$',
    },
  },
  setupFilesAfterEnv: ['<rootDir>/../../setup-jest.js'],
  snapshotSerializers: [
    '<rootDir>/../../build/serializers/html-comment',
    '<rootDir>/../../build/serializers/ng-snapshot',
    '<rootDir>/../../build/serializers/no-ng-attributes',
  ],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|js|html|scss)$': '<rootDir>/../../build/index.js',
  },
};
