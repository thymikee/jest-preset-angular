export default {
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.(ts|js)$": ["<rootDir>/../../build/index.js", {
      tsconfig: "tsconfig-esm.spec.json",
      useESM: true,
      isolatedModules: true,
    }],
  },
  moduleNameMapper: {
    '@googlemaps/markerclusterer': '@googlemaps/markerclusterer/dist/index.esm.js',
  },
  transformIgnorePatterns: ['node_modules/(?!@googlemaps/markerclusterer)'],
};
