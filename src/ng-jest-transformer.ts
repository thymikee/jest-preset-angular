import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';

import type { TransformedSource, TransformOptions } from '@jest/transform';
import type { ProjectConfigTsJest } from 'ts-jest';
import { parse } from 'ts-jest';
import { ConfigSet } from 'ts-jest/dist/legacy/config/config-set';
import { TsJestTransformer } from 'ts-jest/dist/legacy/ts-jest-transformer';

import { NgJestCompiler } from './compiler/ng-jest-compiler';
import { getDiskPrecompiledOutputPath } from './compiler/ng-jest-preprocessor';
import { NgJestConfig } from './config/ng-jest-config';
import type { TransformOptionsNgJest } from './types';
import { ngJestLogger } from './utils/logger';

type PrecompiledOutput = Record<string, string> | undefined;

// Cache the result between multiple transformer instances
// to avoid spawning multiple processes (which can have a major
// performance impact when used with multiple projects).
let useNativeEsbuild: boolean | undefined;
let diskPrecompiledOutput: PrecompiledOutput;
const getDiskCompiledOutput = (diskCompiledOutputPath: string): PrecompiledOutput => {
  try {
    const diskCompiledOutput = fs.readFileSync(diskCompiledOutputPath, 'utf-8');
    if (diskCompiledOutput) {
      return parse(diskCompiledOutput);
    }
  } catch {}

  return undefined;
};

export class NgJestTransformer extends TsJestTransformer {
  private readonly ngJestLogger = ngJestLogger;
  private readonly esbuildImpl: typeof import('esbuild');

  constructor() {
    super();
    if (useNativeEsbuild === undefined) {
      try {
        const esbuildCheckPath = require.resolve('@angular-devkit/build-angular/esbuild-check.js');
        const { status, error } = spawnSync(process.execPath, [esbuildCheckPath]);
        useNativeEsbuild = status === 0 && error === undefined;
      } catch (e) {
        useNativeEsbuild = false;
      }
    }
    this.esbuildImpl = useNativeEsbuild ? require('esbuild') : require('esbuild-wasm');

    const diskCompiledOutputPath = getDiskPrecompiledOutputPath();
    if (!diskPrecompiledOutput) {
      diskPrecompiledOutput = getDiskCompiledOutput(diskCompiledOutputPath);
    } else {
      const precompiledCount = process.env.precompiledCount ? +process.env.precompiledCount : 0;
      if (precompiledCount > 0) {
        diskPrecompiledOutput = getDiskCompiledOutput(diskCompiledOutputPath);
      }
    }
  }

  protected _createConfigSet(config: ProjectConfigTsJest | undefined): ConfigSet {
    return new NgJestConfig(config);
  }

  protected _createCompiler(configSet: ConfigSet, cacheFS: Map<string, string>): void {
    this._compiler = new NgJestCompiler(configSet, cacheFS);
  }

  process(fileContent: string, filePath: string, transformOptions: TransformOptionsNgJest): TransformedSource {
    // @ts-expect-error we are accessing the private cache to avoid creating new objects all the time
    const configSet = super._configsFor(transformOptions);
    /**
     * TypeScript < 4.5 doesn't support compiling `.mjs` file by default when running `tsc` which throws error. Also we
     * transform `js` files from `node_modules` assuming that `node_modules` contains compiled files to speed up compilation.
     * IMPORTANT: we exclude `tslib` from compilation because it has issue with compilation. The original `tslib.js` or
     * `tslib.es6.js` works well with Jest without extra compilation
     */
    if (
      path.extname(filePath) === '.mjs' ||
      (/node_modules\/(.*.js$)/.test(filePath.replace(/\\/g, '/')) && !filePath.includes('tslib'))
    ) {
      this.ngJestLogger.debug({ filePath }, 'process with esbuild');

      const compilerOpts = configSet.parsedTsConfig.options;
      const { code, map } = this.esbuildImpl.transformSync(fileContent, {
        loader: 'js',
        format: transformOptions.supportsStaticESM && configSet.useESM ? 'esm' : 'cjs',
        target: compilerOpts.target === configSet.compilerModule.ScriptTarget.ES2015 ? 'es2015' : 'es2016',
        sourcemap: compilerOpts.sourceMap,
        sourcefile: filePath,
        sourcesContent: true,
        sourceRoot: compilerOpts.sourceRoot,
      });

      return {
        code,
        map,
      };
    } else {
      const filePrecompiledOutput = diskPrecompiledOutput && diskPrecompiledOutput[filePath];

      return filePrecompiledOutput
        ? {
            code: filePrecompiledOutput,
          }
        : super.process(fileContent, filePath, transformOptions as TransformOptions);
    }
  }

  processAsync(
    sourceText: string,
    filePath: string,
    transformOptions: TransformOptionsNgJest,
  ): Promise<TransformedSource> {
    this.ngJestLogger.debug({ fileName: filePath, transformOptions }, 'processing', filePath);

    const filePrecompiledOutput = diskPrecompiledOutput && diskPrecompiledOutput[filePath];

    return filePrecompiledOutput
      ? Promise.resolve({
          code: filePrecompiledOutput,
        })
      : super.processAsync(sourceText, filePath, transformOptions as TransformOptions);
  }
}
