import path from 'path';

import runJest from '../run-jest';
import { onNodeVersions, runYarnInstall } from '../utils';

const dir = path.resolve(__dirname, '../with-babel');

beforeEach(() => {
  runYarnInstall(dir);
});

test('support using with Babel', () => {
  // --no-cache because babel can cache stuff and result in false green
  const result = runJest('with-babel', ['--no-cache']);

  expect(result.exitCode).toBe(0);
});

onNodeVersions('^12.17.0 || >=13.2.0', () => {
  test('support using with Babel in ESM mode', () => {
    // --no-cache because babel can cache stuff and result in false green
    const result = runJest('with-babel', ['-c=jest-esm.config.js', '--no-cache'], {
      nodeOptions: '--experimental-vm-modules',
    });

    expect(result.exitCode).toBe(0);
  });
});
