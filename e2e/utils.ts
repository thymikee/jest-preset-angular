import fs from 'fs';
import path from 'path';

import type { Config } from '@jest/types';
import { ExecaReturnValue, sync as spawnSync } from 'execa';
import semver from 'semver';

interface RunResult extends ExecaReturnValue {
  status: number;
  error: Error;
}

export const normalizeIcons = (str: string): string => {
  if (!str) {
    return str;
  }

  // Make sure to keep in sync with `jest-cli/src/constants`
  return str.replace(new RegExp('\u00D7', 'g'), '\u2715').replace(new RegExp('\u221A', 'g'), '\u2713');
};

const run = (cmd: string, cwd?: Config.Path, env?: Record<string, string>): RunResult => {
  const args = cmd.split(/\s/).slice(1);
  const spawnOptions = { cwd, env, preferLocal: false, reject: false };
  const result = spawnSync(cmd.split(/\s/)[0], args, spawnOptions) as RunResult;

  // For compat with cross-spawn
  result.status = result.exitCode;

  if (result.status !== 0) {
    const message = `
      ORIGINAL CMD: ${cmd}
      STDOUT: ${result.stdout}
      STDERR: ${result.stderr}
      STATUS: ${result.status}
      ERROR: ${result.error}
    `;
    throw new Error(message);
  }

  return result;
};

export const runYarnInstall = (cwd: Config.Path, env?: Record<string, string>): RunResult => {
  const lockfilePath = path.resolve(cwd, 'yarn.lock');
  let exists = true;

  // If the lockfile doesn't exist, yarn's project detection is confused. Just creating an empty file works
  if (!fs.existsSync(lockfilePath)) {
    exists = false;
    fs.writeFileSync(lockfilePath, '');
  }

  return run(exists ? 'yarn install --immutable' : 'yarn install', cwd, env);
};

export const onNodeVersions = (versionRange: string, testBody: () => void): void => {
  const description = `on node ${versionRange}`;
  if (semver.satisfies(process.versions.node, versionRange)) {
    // eslint-disable-next-line jest/valid-title
    describe(description, () => {
      testBody();
    });
  } else {
    // eslint-disable-next-line
    describe.skip(description, () => {
      testBody();
    });
  }
};
