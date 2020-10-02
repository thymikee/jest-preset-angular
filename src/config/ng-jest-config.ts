import type { ParsedConfiguration } from '@angular/compiler-cli';
import { formatDiagnostics, readConfiguration } from '@angular/compiler-cli';
import type { Config } from '@jest/types';
import { ParsedCommandLine, ModuleKind, ScriptTarget } from 'typescript';

import { ConfigSet } from 'ts-jest/dist/config/config-set';

/**
 * Temporary interface to make sure that `ts-jest` LanguageService still works. Once we use Angular Compiler, this
 * interface can be removed
 */
interface ExtendedParsedConfiguration extends ParsedConfiguration {
  fileNames: string[];
}

export class NgJestConfig extends ConfigSet {
  constructor(public jestConfig: Config.ProjectConfig) {
    super(jestConfig);
  }

  readTsConfig(): ExtendedParsedConfiguration {
    const { globals } = this.jestConfig;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const extraTsconfig: string | ParsedCommandLine | undefined =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      globals && globals['ts-jest'] ? (globals as Record<string, any>)['ts-jest'].tsconfig : undefined;
    let config!: ParsedConfiguration;
    /**
     * By default, readConfiguration will pick up `tsconfig.json` from current directory. Because we are getting config
     * via `ts-jest`, we need to manually get `tsconfig` from `ts-jest` options from `jest` config.
     */
    if (typeof extraTsconfig === 'string') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error `ts-jest` doesn't expose typing for resolvePath
      config = readConfiguration(super.resolvePath(extraTsconfig));
    } else {
      config = readConfiguration(this.jestConfig.cwd ?? process.cwd());
      if (extraTsconfig) {
        config = {
          ...config,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          options: {
            ...config.options,
            ...extraTsconfig,
          } as Record<string, any>, // eslint-disable-line @typescript-eslint/no-explicit-any
        };
      }
    }
    if (config.errors?.length) {
      throw new Error(formatDiagnostics(config.errors));
    }

    /**
     * Temporary return this type of object as well as all override compiler options so that `ts-jest` compilation
     * still works
     */
    return {
      ...config,
      options: {
        ...config.options,
        target: ScriptTarget.ES5,
        module: ModuleKind.CommonJS,
        sourceMap: true,
        inlineSourceMap: false,
        inlineSources: true,
        declaration: false,
        noEmit: false,
        removeComments: false,
        out: undefined,
        outFile: undefined,
        composite: undefined,
        declarationDir: undefined,
        declarationMap: undefined,
        emitDeclarationOnly: undefined,
        sourceRoot: undefined,
        tsBuildInfoFile: undefined,
      },
      fileNames: config.rootNames,
    };
  }
}
