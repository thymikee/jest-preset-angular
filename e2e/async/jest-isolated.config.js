const baseCfg = require('./jest.config');

module.exports = {
  ...baseCfg,
  globals: {
    'ts-jest': {
      ...baseCfg.globals['ts-jest'],
      isolatedModules: true,
    },
  },
};
