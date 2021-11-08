module.exports = {
  injectGlobals: false,
  transform: { '^.+\\.(ts|js|html)$': '<rootDir>/../../build/index.js' },
};
