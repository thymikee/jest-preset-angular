import type { TransformedSource, Transformer, TransformOptions } from '@jest/transform';
import type { Config } from '@jest/types';
import { TsJestTransformer } from 'ts-jest/dist/ts-jest-transformer';

class AngularJestTransformer extends TsJestTransformer implements Transformer {
  process(
    input: string,
    filePath: Config.Path,
    jestConfig: Config.ProjectConfig,
    transformOptions?: TransformOptions,
  ): TransformedSource | string {
    return super.process(input, filePath, jestConfig, transformOptions);
  }
}

export = new AngularJestTransformer();
