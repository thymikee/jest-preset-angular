/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
const jestConfig = {
  projects: ['<rootDir>/apps/app1/jest-esm.config.mjs', '<rootDir>/libs/user/jest-esm.config.mjs'],
};

export default jestConfig;
