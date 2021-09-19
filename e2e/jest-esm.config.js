require('../ngcc-jest-processor');

/** @type {import('ts-jest/dist/types').ProjectConfigTsJest} */
module.exports = {
  projects: [
    '<rootDir>/ast-transformers/downlevel-ctor/jest-esm.config.js',
    '<rootDir>/ast-transformers/replace-resources/jest-esm.config.js',
    '<rootDir>/async/jest-esm.config.js',
    '<rootDir>/custom-typings/jest-esm.config.js',
    '<rootDir>/jest-globals/jest-esm.config.js',
    '<rootDir>/snapshot-serializers/jest-esm.config.js',
    '<rootDir>/with-babel/jest-esm.config.js',
  ],
};
