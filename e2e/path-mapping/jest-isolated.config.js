const baseCfg = require('./jest.config');

module.exports = {
  ...baseCfg,
  transform: {
    ...baseCfg.transform,
    '^.+\\.(ts|js|html)$': [
      '<rootDir>/../../build/index.js',
      {
        isolatedModules: true,
      },
    ],
  },
};
