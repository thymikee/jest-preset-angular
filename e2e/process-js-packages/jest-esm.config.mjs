export default {
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig-esm.spec.json',
      useESM: true,
      isolatedModules: true,
    },
  },
  transform: {
    '^.+\\.(ts|js)$': '<rootDir>/../../build/index.js',
  },
  moduleNameMapper: {
    '@googlemaps/markerclusterer': '@googlemaps/markerclusterer/dist/index.esm.js',
  },
  transformIgnorePatterns: ['node_modules/(?!@googlemaps/markerclusterer)'],
};
