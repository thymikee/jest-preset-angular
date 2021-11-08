module.exports = {
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
  transform: {
    '^.+\\.(ts|js|html)$': '<rootDir>/../../build/index.js',
  },
};
