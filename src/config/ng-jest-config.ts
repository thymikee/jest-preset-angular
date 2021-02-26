import { NodeJSFileSystem, setFileSystem } from '@angular/compiler-cli/src/ngtsc/file_system';
import { formatDiagnostics, readConfiguration, ParsedConfiguration } from '@angular/compiler-cli/src/perform_compile';
import { ConfigSet } from 'ts-jest/dist/config/config-set';
import type { RawCompilerOptions } from 'ts-jest/dist/raw-compiler-options';
import type { ProjectConfigTsJest } from 'ts-jest/dist/types';
import type { ParsedCommandLine } from 'typescript';

export class NgJestConfig extends ConfigSet {
  constructor(readonly jestCfg: ProjectConfigTsJest) {
    super(jestCfg);
  }

  /**
   * Override `ts-jest` behavior because we use `readConfiguration` which will read and resolve tsconfig.
   */
  protected _resolveTsConfig(compilerOptions?: RawCompilerOptions, resolvedConfigFile?: string): ParsedCommandLine {
    /**
     * To be able to use `readConfiguration` function from `@angular/cli`, we need to setup file system. For `CommonJS`,
     * it is not a problem to import directly the function from `@angular/cli`. However, with `ESM`, we will get an
     * error that `readConfiguration` function is not exposed. So workaround is:
     * - Any functions which is imported from `@angular/cli` should be pointed directly to the real path, not
     * to the `index.d.ts`.
     * - Setup file system should be called explicitly.
     *
     * See https://github.com/angular/angular/issues/32352#issuecomment-525624772
     */
    setFileSystem(new NodeJSFileSystem());

    this.logger.debug(
      '_resolveTsConfig: read and resolve config from tsconfig using @angular/compiler-cli readConfiguration',
    );

    let result: ParsedConfiguration;
    if (resolvedConfigFile) {
      result = readConfiguration(resolvedConfigFile);
    } else {
      result = readConfiguration(this.cwd);
      if (compilerOptions) {
        result = {
          ...result,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          options: {
            ...result.options,
            ...compilerOptions,
          } as Record<string, any>, // eslint-disable-line @typescript-eslint/no-explicit-any
        };
      }
    }
    if (result.errors?.length) {
      throw new Error(formatDiagnostics(result.errors));
    }

    return {
      ...result,
      fileNames: result.rootNames,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      options: {
        ...result.options,
        suppressOutputPathCheck: true,
        skipLibCheck: result.options.skipLibCheck ?? true,
        // For performance, disable AOT decorator downleveling transformer for applications in the CLI.
        // The transformer is not needed for VE or Ivy in this plugin since Angular decorators are removed.
        // While the transformer would make no changes, it would still need to walk each source file AST.
        annotationsAs: 'decorators' as const,
      },
    };
  }
}
