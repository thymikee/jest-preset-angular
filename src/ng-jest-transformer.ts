import path from 'path';

import type { TransformedSource } from '@jest/transform';
import type { Config } from '@jest/types';
import { ConfigSet } from 'ts-jest/dist/config/config-set';
import { TsJestTransformer } from 'ts-jest/dist/ts-jest-transformer';
import type { ProjectConfigTsJest, TransformOptionsTsJest } from 'ts-jest/dist/types';

import { NgJestCompiler } from './compiler/ng-jest-compiler';
import { NgJestConfig } from './config/ng-jest-config';

export class NgJestTransformer extends TsJestTransformer {
  protected _createConfigSet(config: ProjectConfigTsJest | undefined): ConfigSet {
    return new NgJestConfig(config);
  }

  protected _createCompiler(configSet: ConfigSet, cacheFS: Map<string, string>): void {
    this._compiler = new NgJestCompiler(configSet, cacheFS);
  }

  process(
    fileContent: string,
    filePath: Config.Path,
    transformOptions: TransformOptionsTsJest,
  ): TransformedSource | string {
    const configSet = this._createConfigSet(transformOptions.config);
    /**
     * TypeScript < 4.5 doesn't support compiling `.mjs` file by default when running `tsc` which throws error
     * ```
     * File '/Users/ahn/ts-jest-only-example/foo.mjs' has an unsupported extension. The only supported extensions are
     * '.ts', '.tsx', '.d.ts', '.js', '.jsx'.
     * ```
     * However, `transpileModule` API supports `.mjs` so we use it as a workaround.
     */
    if (path.extname(filePath) === '.mjs') {
      const compilerOptions = configSet.parsedTsConfig.options;
      const compilerModule = configSet.compilerModule;
      const { outputText, sourceMapText, diagnostics } = compilerModule.transpileModule(fileContent, {
        compilerOptions: {
          ...compilerOptions,
          module:
            transformOptions.supportsStaticESM && configSet.useESM
              ? compilerModule.ModuleKind.ES2020
              : compilerModule.ModuleKind.CommonJS,
        },
        fileName: filePath,
        reportDiagnostics: configSet.shouldReportDiagnostics(filePath),
      });
      if (diagnostics?.length) {
        configSet.raiseDiagnostics(diagnostics, filePath);
      }

      return {
        code: outputText,
        map: sourceMapText,
      };
    } else {
      return super.process(fileContent, filePath, transformOptions);
    }
  }
}
