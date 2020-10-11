import type { ParsedConfiguration } from '@angular/compiler-cli';
import { formatDiagnostics, readConfiguration } from '@angular/compiler-cli';
import type { Config } from '@jest/types';
import { ConfigSet } from 'ts-jest/dist/config/config-set';
import { ParsedCommandLine, ModuleKind, ScriptTarget } from 'typescript';

export class NgJestConfig extends ConfigSet {
  private _parsedNgConfig!: ParsedConfiguration;

  constructor(private jestConfig: Config.ProjectConfig) {
    super(jestConfig);
    this.setupOptions(jestConfig);
  }

  /**
   * Override `ts-jest` parsedTsConfig so that it always returns Angular compiler config
   */
  get parsedTsConfig(): ParsedConfiguration {
    return this._parsedNgConfig;
  }

  private setupOptions(jestConfig: Config.ProjectConfig): void {
    const { globals } = jestConfig;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const extraTsconfig: string | ParsedCommandLine | undefined =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      globals && globals['ts-jest'] ? (globals as Record<string, any>)['ts-jest'].tsconfig : undefined;
    /**
     * By default, readConfiguration will pick up `tsconfig.json` from current directory. Because we are getting config
     * via `ts-jest`, we need to manually get `tsconfig` from `ts-jest` options from `jest` config.
     */
    if (typeof extraTsconfig === 'string') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error `ts-jest` doesn't expose typing for resolvePath
      this._parsedNgConfig = readConfiguration(super.resolvePath(extraTsconfig));
    } else {
      this._parsedNgConfig = readConfiguration(this.jestConfig.cwd ?? process.cwd());
      if (extraTsconfig) {
        this._parsedNgConfig = {
          ...this._parsedNgConfig,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          options: {
            ...this._parsedNgConfig.options,
            ...extraTsconfig,
          } as Record<string, any>, // eslint-disable-line @typescript-eslint/no-explicit-any
        };
      }
    }
    if (this._parsedNgConfig.errors?.length) {
      throw new Error(formatDiagnostics(this._parsedNgConfig.errors));
    }
    this._parsedNgConfig = {
      ...this._parsedNgConfig,
      options: {
        ...this._parsedNgConfig.options,
        module: ModuleKind.CommonJS,
        target: ScriptTarget.ES5,
      },
    };
  }
}
