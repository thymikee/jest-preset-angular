module.exports = {
  transform: {
    '^.+\\.(ts|js|html)$': [
      '<rootDir>/../../build/index.js',
      {
        ...require('./ts-jest.config'),
        isolatedModules: true,
      },
    ],
  },
};
