const baseCfg = require('./jest.config');

module.exports = {
  ...baseCfg,
  transform: {
    ...baseCfg.transform,
    '^.+\\.(ts|mjs|js|html)$': [
      '<rootDir>/../../build/index.js',
      {
        ...require('./ts-jest.config'),
        isolatedModules: true,
      },
    ],
  },
};
