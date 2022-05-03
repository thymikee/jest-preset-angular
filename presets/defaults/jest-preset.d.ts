declare const _default: {
  transformIgnorePatterns: string[];
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': string;
  };
  globals: import('ts-jest').GlobalConfigTsJest;
  testEnvironment: string;
  moduleFileExtensions: string[];
  snapshotSerializers: string[];
};
export default _default;
