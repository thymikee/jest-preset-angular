const baseCfg = require('./jest.config');

module.exports = {
  ...baseCfg,
  globals: {
    ...baseCfg.globals['ts-jest'],
    isolatedModules: true,
  },
};
