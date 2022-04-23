const { pathsToModuleNameMapper } = require('ts-jest');
const { paths } = require('./tsconfig.json').compilerOptions;

module.exports = {
  moduleNameMapper: pathsToModuleNameMapper(paths, { prefix: '<rootDir>' }),
  transform: { '^.+\\.(ts|js|html)$': '<rootDir>/../../build/index.js' },
};
