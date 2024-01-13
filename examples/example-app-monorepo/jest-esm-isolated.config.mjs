/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
const jestConfig = {
  projects: ['<rootDir>/apps/app1/jest-esm-isolated.config.mjs', '<rootDir>/libs/user/jest-esm-isolated.config.mjs'],
};

export default jestConfig;
