const baseCfg = require('./jest.config');

module.exports = {
  ...baseCfg,
  globals: {
    isolatedModules: true,
  },
};
