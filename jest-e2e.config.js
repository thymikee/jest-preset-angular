const baseCfg = require('./jest.config');

module.exports = {
  ...baseCfg,
  testPathIgnorePatterns: [
    '/src/__tests__/__mocks__/',
    '/src/__tests__/__helpers__/',
    '/node_modules/',
    '/examples/',
    '/e2e/.*/__tests__',
    'src',
    '\\.snap$',
  ],
};
