import type { Logger } from 'bs-logger';
import { globsToMatcher } from 'jest-util';
import { type ProjectConfigTsJest, type RawCompilerOptions, ConfigSet } from 'ts-jest';
import type { ParsedCommandLine } from 'typescript';

/**
 * Some NPM packages like `tslib` is distributed in such a way that `esbuild` cannot process it, so we fall back to use TypeScript API
 */
const defaultProcessWithEsbuildPatterns = ['**/*.mjs'];

export class NgJestConfig extends ConfigSet {
  readonly processWithEsbuild: ReturnType<typeof globsToMatcher>;

  constructor(jestConfig: ProjectConfigTsJest | undefined, parentLogger?: Logger | undefined) {
    super(jestConfig, parentLogger);
    const jestGlobalsConfig = jestConfig?.globals?.ngJest ?? Object.create(null);
    this.processWithEsbuild = globsToMatcher([
      ...(jestGlobalsConfig.processWithEsbuild ?? []),
      ...defaultProcessWithEsbuildPatterns,
    ]);
  }

  /**
   * Override `ts-jest` behavior because we use `readConfiguration` which will read and resolve tsconfig.
   */
  protected _resolveTsConfig(compilerOptions?: RawCompilerOptions, resolvedConfigFile?: string): ParsedCommandLine {
    const result = super._resolveTsConfig(compilerOptions, resolvedConfigFile) as ParsedCommandLine;
    result.options.enableIvy = true;
    result.options.noEmitOnError = false;
    result.options.suppressOutputPathCheck = true;
    result.options.allowEmptyCodegenFiles = false;
    result.options.annotationsAs = 'decorators';
    result.options.enableResourceInlining = false;
    // Since we define preset default also transform `js` so we need to set `allowJs` true
    result.options.allowJs = true;

    return result;
  }
}
