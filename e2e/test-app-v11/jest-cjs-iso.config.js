const baseConfig = require('./jest.config');
const defaultPreset = require('jest-preset-angular/jest-preset');

/** @type {import('ts-jest/dist/types').ProjectConfigTsJest} */
module.exports = {
  ...baseConfig,
  preset: 'jest-preset-angular',
  globals: {
    'ts-jest': {
      ...defaultPreset.globals['ts-jest'],
      isolatedModules: true,
    }
  },
};
