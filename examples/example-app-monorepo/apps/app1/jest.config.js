const { pathsToModuleNameMapper } = require('ts-jest');

const { paths } = require('./tsconfig.json').compilerOptions;

/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
    displayName: 'app1',
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    moduleNameMapper: pathsToModuleNameMapper(paths, { prefix: '<rootDir>' }),
};
