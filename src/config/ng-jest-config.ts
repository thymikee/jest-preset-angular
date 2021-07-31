import { ConfigSet } from 'ts-jest/dist/config/config-set';
import type { RawCompilerOptions } from 'ts-jest/dist/raw-compiler-options';
import type { ParsedCommandLine } from 'typescript';

export class NgJestConfig extends ConfigSet {
  /**
   * Override `ts-jest` behavior because we use `readConfiguration` which will read and resolve tsconfig.
   */
  protected _resolveTsConfig(compilerOptions?: RawCompilerOptions, resolvedConfigFile?: string): ParsedCommandLine {
    const result = super._resolveTsConfig(compilerOptions, resolvedConfigFile);
    result.options.enableIvy = true;
    result.options.noEmitOnError = false;
    result.options.suppressOutputPathCheck = true;
    result.options.allowEmptyCodegenFiles = false;
    result.options.annotationsAs = 'decorators';
    result.options.enableResourceInlining = false;
    // Since we define preset default also transform `js` so we need to set `allowJs` true
    result.options.allowJs = true;

    return result as ParsedCommandLine;
  }
}
