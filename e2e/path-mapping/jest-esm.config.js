const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { paths } = require('./tsconfig-esm.json').compilerOptions;

/** @type {import('ts-jest/dist/types').ProjectConfigTsJest} */
module.exports = {
  displayName: 'path-mapping',
  preset: '<rootDir>/../../node_modules/ts-jest/presets/default-esm',
  globals: {
    'ts-jest': {
      useESM: true,
      tsconfig: 'tsconfig-esm.json',
    },
  },
  resolver: '<rootDir>/../../build/resolvers/ng-jest-resolver.js',
  moduleNameMapper: pathsToModuleNameMapper(paths, { prefix: '<rootDir>' }),
  transform: { '^.+\\.(ts|js|html)$': '<rootDir>/../../build/index.js' },
};
