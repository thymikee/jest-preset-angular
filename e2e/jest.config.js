require('../ngcc-jest-processor');

/** @type {import('ts-jest/dist/types').ProjectConfigTsJest} */
module.exports = {
  projects: [
    '<rootDir>/ast-transformers/hoisting',
    '<rootDir>/ast-transformers/ng-jit-transformers',
    '<rootDir>/async',
    '<rootDir>/custom-typings',
    '<rootDir>/jest-globals',
    '<rootDir>/path-mapping',
    '<rootDir>/snapshot-serializers',
    '<rootDir>/with-babel',
  ],
};
