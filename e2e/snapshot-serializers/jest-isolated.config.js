const baseCfg = require('./jest.config');

module.exports = {
    ...baseCfg,
    transform: {
        '^.+\\.(ts|js|mjs|html)$': [
            '<rootDir>/../../build/index.js',
            {
                ...require('./ts-jest.config'),
                isolatedModules: true,
            },
        ],
    },
};
