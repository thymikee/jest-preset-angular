import { spawnSync } from 'child_process';
import { existsSync } from 'fs';
import { dirname, join } from 'path';

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

if (!existsSync(join(process.cwd(), 'angular.json'))) {
  throw new Error('ngcc-jest-processor should be only run from root directory');
}
spawnSync(
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
