import { readConfiguration, CompilerOptions } from '@angular/compiler-cli';
import { spawnSync } from 'child_process';
import { createHash } from 'crypto';
import { accessSync, constants, existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join, relative, resolve } from 'path';

/**
 * Try resolve a package.json file from the resolved .d.ts file.
 */
function tryResolvePackage(moduleName: string, resolvedFileName: string): string | undefined {
  try {
    // This is based on the logic in the NGCC compiler
    // tslint:disable-next-line:max-line-length
    // See: https://github.com/angular/angular/blob/b93c1dffa17e4e6900b3ab1b9e554b6da92be0de/packages/compiler-cli/src/ngcc/src/packages/dependency_host.ts#L85-L121
    return require.resolve(`${moduleName}/package.json`, {
      paths: [resolvedFileName],
    });
  } catch {
    // if it fails this might be a deep import which doesn't have a package.json
    // Ex: @angular/compiler/src/i18n/i18n_ast/package.json
    // or local libraries which don't reside in node_modules
    const packageJsonPath = resolve(resolvedFileName, '../package.json');

    return existsSync(packageJsonPath) ? packageJsonPath : undefined;
  }
}

function findNodeModulesDirectory(startPoint: string): string {
  let current = startPoint;
  while (dirname(current) !== current) {
    const nodePath = join(current, 'node_modules');
    if (existsSync(nodePath)) {
      return nodePath;
    }

    current = dirname(current);
  }

  throw new Error(`Cannot locate the 'node_modules' directory.`);
}

function isReadOnlyFile(fileName: string): boolean {
  try {
    accessSync(fileName, constants.W_OK);

    return false;
  } catch {
    return true;
  }
}

/**
 * Mainly copied from https://github.com/angular/angular-cli/blob/master/packages/ngtools/webpack/src/ngcc_processor.ts
 * and adjusted to suit to Jest.
 */
class NgccJestProcessor {
  private readonly _nodeModulesDirectory: string;
  private readonly _options: CompilerOptions;
  private readonly _tsConfigPath: string;

  constructor() {
    this._options = readConfiguration(process.cwd()).options;
    this._tsConfigPath = this._options.configFilePath as string;
    this._nodeModulesDirectory = findNodeModulesDirectory(this._options.basePath ?? process.cwd());
  }

  /** Process the entire node modules tree. */
  process() {
    // Under Bazel when running in sandbox mode parts of the filesystem is read-only.
    if (process.env.BAZEL_TARGET) {
      return;
    }

    // Skip if node_modules are read-only
    const corePackage = tryResolvePackage('@angular/core', this._nodeModulesDirectory);
    if (corePackage && isReadOnlyFile(corePackage)) {
      return;
    }

    // Perform a ngcc run check to determine if an initial execution is required.
    // If a run hash file exists that matches the current package manager lock file and the
    // project's tsconfig, then an initial ngcc run has already been performed.
    let skipProcessing = false;
    let runHashFilePath: string | undefined;
    const runHashBasePath = join(this._nodeModulesDirectory, '.cli-ngcc');
    const projectBasePath = join(this._nodeModulesDirectory, '..');
    try {
      let lockData;
      let lockFile = 'yarn.lock';
      try {
        lockData = readFileSync(join(projectBasePath, lockFile));
      } catch {
        lockFile = 'package-lock.json';
        lockData = readFileSync(join(projectBasePath, lockFile));
      }

      let ngccConfigData;
      try {
        ngccConfigData = readFileSync(join(projectBasePath, 'ngcc.config.js'));
      } catch {
        ngccConfigData = '';
      }

      const relativeTsconfigPath = relative(projectBasePath, this._tsConfigPath);
      const tsconfigData = readFileSync(this._tsConfigPath);

      // Generate a hash that represents the state of the package lock file and used tsconfig
      const runHash = createHash('sha256')
        .update(lockData)
        .update(lockFile)
        .update(ngccConfigData)
        .update(tsconfigData)
        .update(relativeTsconfigPath)
        .digest('hex');

      // The hash is used directly in the file name to mitigate potential read/write race
      // conditions as well as to only require a file existence check
      runHashFilePath = join(runHashBasePath, runHash + '.lock');

      // If the run hash lock file exists, then ngcc was already run against this project state
      if (existsSync(runHashFilePath)) {
        skipProcessing = true;
      }
    } catch {
      // Any error means an ngcc execution is needed
    }

    if (skipProcessing) {
      return;
    }

    // We spawn instead of using the API because:
    // - NGCC Async uses clustering which is problematic when used via the API which means
    // that we cannot setup multiple cluster masters with different options.
    // - We will not be able to have concurrent builds otherwise Ex: App-Shell,
    // as NGCC will create a lock file for both builds and it will cause builds to fails.
    const { status, error } = spawnSync(
      process.execPath,
      [
        require.resolve('@angular/compiler-cli/ngcc/main-ngcc.js'),
        '--source' /** basePath */,
        this._nodeModulesDirectory,
        '--properties' /** propertiesToConsider */,
        /**
         * There are various properties: fesm2015, fesm5, es2015, esm2015, esm5, main, module, browser to choose from.
         * Currently Jest requires `commonjs` so we only need to ask `ngcc` to produce `umd` outputs. Later when switching
         * to ESM, we can change to different properties to produce ESM outputs.
         */
        ...['main'],
        '--first-only' /** compileAllFormats */,
        'false', // make sure that `ngcc` runs on subfolders as well
        '--async',
      ],
      {
        stdio: ['inherit', process.stderr, process.stderr],
      },
    );

    if (status !== 0) {
      const errorMessage = error?.message || '';
      throw new Error(errorMessage + `NGCC failed${errorMessage ? ', see above' : ''}.`);
    }

    // ngcc was successful so if a run hash was generated, write it for next time
    if (runHashFilePath) {
      try {
        if (!existsSync(runHashBasePath)) {
          mkdirSync(runHashBasePath, { recursive: true });
        }
        writeFileSync(runHashFilePath, '');
      } catch {
        // Errors are non-fatal
      }
    }
  }
}

new NgccJestProcessor().process();
