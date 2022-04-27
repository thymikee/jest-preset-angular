/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const jestConfig = {
  projects: [
    '<rootDir>/projects/app1/jest-esm-isolated.config.mjs',
    '<rootDir>/projects/app2/jest-esm-isolated.config.mjs',
  ],
};

export default jestConfig;
