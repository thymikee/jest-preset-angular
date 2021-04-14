import runJest from '../run-jest';
import { onNodeVersions } from '../utils';

test('support using with Babel', () => {
  const result = runJest('with-babel');

  expect(result.exitCode).toBe(0);
});

onNodeVersions('^12.17.0 || >=13.2.0', () => {
  test('support using with Babel in ESM mode', () => {
    const result = runJest('with-babel', ['-c=jest-esm.config.js'], {
      nodeOptions: '--experimental-vm-modules',
    });

    expect(result.exitCode).toBe(0);
  });
});
