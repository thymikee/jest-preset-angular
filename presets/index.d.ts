declare const _default: {
  defaults: {
    transformIgnorePatterns: string[];
    transform: import('ts-jest').JestConfigWithTsJest['transform'];
    testEnvironment: string;
    moduleFileExtensions: string[];
    snapshotSerializers: string[];
  };
  defaultsESM: {
    extensionsToTreatAsEsm: string[];
    moduleNameMapper: {
      tslib: string;
    };
    transform: import('ts-jest').JestConfigWithTsJest['transform'];
    transformIgnorePatterns: string[];
    testEnvironment: string;
    moduleFileExtensions: string[];
    snapshotSerializers: string[];
  };
  defaultTransformerOptions: import('ts-jest').TsJestTransformerOptions;
};
export default _default;
