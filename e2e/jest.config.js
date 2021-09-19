require('../ngcc-jest-processor');

/** @type {import('ts-jest/dist/types').ProjectConfigTsJest} */
module.exports = {
  projects: [
    '<rootDir>/ast-transformers/downlevel-ctor',
    '<rootDir>/ast-transformers/hoisting',
    '<rootDir>/ast-transformers/replace-resources',
    '<rootDir>/async',
    '<rootDir>/custom-typings',
    '<rootDir>/jest-globals',
    '<rootDir>/snapshot-serializers',
    '<rootDir>/with-babel',
  ],
};
