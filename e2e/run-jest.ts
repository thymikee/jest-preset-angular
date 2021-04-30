import * as path from 'path';

import execa from 'execa';
import fs from 'graceful-fs';
import stripAnsi from 'strip-ansi';

import { normalizeIcons } from './utils';

const JEST_PATH = path.resolve(__dirname, '../node_modules/jest-cli/bin/jest.js');

type RunJestOptions = {
  nodeOptions?: string;
  nodePath?: string;
  skipPkgJsonCheck?: boolean; // don't complain if can't find package.json
  stripAnsi?: boolean; // remove colors from stdout and stderr,
  timeout?: number; // kill the Jest process after X milliseconds
  env?: NodeJS.ProcessEnv;
};

// return the result of the spawned process:
//  [ 'status', 'signal', 'output', 'pid', 'stdout', 'stderr',
//    'envPairs', 'options', 'args', 'file' ]
export default function runJest(dir: string, args?: string[], options: RunJestOptions = {}): RunJestResult {
  return normalizeStdoutAndStderr(spawnJest(dir, args, options), options);
}

function spawnJest(dir: string, args?: string[], options?: RunJestOptions, spawnAsync?: false): RunJestResult;
function spawnJest(dir: string, args?: string[], options?: RunJestOptions, spawnAsync?: true): execa.ExecaChildProcess;

// Spawns Jest and returns either a Promise (if spawnAsync is true) or the completed child process
function spawnJest(
  dir: string,
  args: string[] = [],
  options: RunJestOptions = {},
  spawnAsync = false,
): execa.ExecaSyncReturnValue | execa.ExecaChildProcess {
  const isRelative = !path.isAbsolute(dir);
  if (isRelative) {
    dir = path.resolve(__dirname, dir);
  }
  const localPackageJson = path.resolve(dir, 'package.json');
  if (!options.skipPkgJsonCheck && !fs.existsSync(localPackageJson)) {
    throw new Error(
      `
      Make sure you have a local package.json file at
        "${localPackageJson}".
      Otherwise Jest will try to traverse the directory tree and find the
      global package.json, which will send Jest into infinite loop.
    `,
    );
  }
  const env: NodeJS.ProcessEnv = {
    ...process.env,
    FORCE_COLOR: '0',
    ...options.env,
  };
  if (options.nodeOptions) env['NODE_OPTIONS'] = options.nodeOptions;
  if (options.nodePath) env['NODE_PATH'] = options.nodePath;
  const spawnArgs = [JEST_PATH, ...args];
  const spawnOptions: execa.CommonOptions<string> = {
    cwd: dir,
    env,
    reject: false,
    timeout: options.timeout || 0,
  };

  return (spawnAsync ? execa : execa.sync)(process.execPath, spawnArgs, spawnOptions);
}

type RunJestResult = execa.ExecaReturnValue;

function normalizeStdoutAndStderr(result: RunJestResult, options: RunJestOptions): RunJestResult {
  if (options.stripAnsi) result.stdout = stripAnsi(result.stdout);
  result.stdout = normalizeIcons(result.stdout);
  if (options.stripAnsi) result.stderr = stripAnsi(result.stderr);
  result.stderr = normalizeIcons(result.stderr);

  return result;
}
