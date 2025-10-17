import type { TsJestTransformerOptions } from 'ts-jest';

export type NgJestTransformerOptions = TsJestTransformerOptions & {
    processWithEsbuild?: string[];
};
