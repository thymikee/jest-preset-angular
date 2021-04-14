const defaultPreset = require('jest-preset-angular/jest-preset');

const baseConfig = require('./jest.config');

/** @type {import('ts-jest/dist/types').ProjectConfigTsJest} */
module.exports = {
  ...baseConfig,
  preset: 'jest-preset-angular',
  globals: {
    'ts-jest': {
      ...defaultPreset.globals['ts-jest'],
      isolatedModules: true,
    },
  },
};
