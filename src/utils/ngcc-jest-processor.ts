/**
 * Mainly copied from https://github.com/angular/angular-cli/blob/master/packages/ngtools/webpack/src/ngcc_processor.ts
 * and adjusted to work with Jest
 */
import { spawnSync } from 'child_process';
import { existsSync } from 'fs';
import { dirname, join } from 'path';

const IGNORE_ARGS = ['--clearCache', '--help', '--init', '--listTests', '--showConfig'];
const canRunNgcc = !process.argv.find((arg) => IGNORE_ARGS.includes(arg));
function findNodeModulesDirectory(startPoint: string): string {
  let current = startPoint;
  while (dirname(current) !== current) {
    const nodePath = join(current, 'node_modules');
    if (existsSync(nodePath)) {
      return nodePath;
    }

    current = dirname(current);
  }

  throw new Error(
    `Cannot locate the 'node_modules' directory. Please make sure you are running jest from root level of your project`,
  );
}

if (canRunNgcc) {
  process.stdout.write('ngcc-jest-processor: running ngcc\n');
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
      findNodeModulesDirectory(process.cwd()),
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
    const errorMessage: string = error?.message ?? '';

    throw new Error(`${errorMessage} NGCC failed ${errorMessage ? ', see above' : ''}.`);
  }
}
