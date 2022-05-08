module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json',
      isolatedModules: true,
    },
    ngJest: {
      processWithEsbuild: ['**/node_modules/lodash-es/*.js'],
    },
  },
  transform: {
    '^.+\\.(ts|js|mjs)$': '<rootDir>/../../build/index.js',
  },
  transformIgnorePatterns: ['node_modules/(?!lodash-es)'],
};
