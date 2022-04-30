declare const _default: {
  defaults: {
    transformIgnorePatterns: string[];
    transform: {
      '^.+\\.(ts|js|mjs|html|svg)$': string;
    };
    globals: import('ts-jest').GlobalConfigTsJest;
    testEnvironment: string;
    moduleFileExtensions: string[];
    snapshotSerializers: string[];
  };
  defaultsESM: {
    extensionsToTreatAsEsm: string[];
    globals: {
      'ts-jest': {
        useESM: boolean;
        tsconfig?: string | boolean | import('ts-jest').RawCompilerOptions | undefined;
        isolatedModules?: boolean | undefined;
        compiler?: string | undefined;
        astTransformers?: import('ts-jest').ConfigCustomTransformer | undefined;
        diagnostics?:
          | boolean
          | {
              pretty?: boolean | undefined;
              ignoreCodes?: string | number | Array<string | number> | undefined;
              exclude?: string[] | undefined;
              warnOnly?: boolean | undefined;
            }
          | undefined;
        babelConfig?: string | boolean | import('@babel/core').TransformOptions | undefined;
        stringifyContentPathRegex?: string | RegExp | undefined;
      };
    };
    moduleNameMapper: {
      tslib: string;
    };
    transform: {
      '^.+\\.(ts|js|html|svg)$': string;
    };
    transformIgnorePatterns: string[];
    testEnvironment: string;
    moduleFileExtensions: string[];
    snapshotSerializers: string[];
  };
};
export default _default;
