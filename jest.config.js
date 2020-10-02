/** @typedef {import('ts-jest')} */
/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json',
    },
  },
  transform: {
    '\\.ts$': '<rootDir>/build/index.js',
  },
  testPathIgnorePatterns: ['/e2e/'],
};
