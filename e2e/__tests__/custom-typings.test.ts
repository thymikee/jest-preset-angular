import runJest from '../run-jest';
import { onNodeVersions } from '../utils';

test('support custom typings', () => {
  const result = runJest('custom-typings');

  expect(result.exitCode).toBe(0);
});

onNodeVersions('^12.17.0 || >=13.2.0', () => {
  test('support custom typings in ESM mode', () => {
    const result = runJest('custom-typings', ['-c=jest-esm.config.js'], {
      nodeOptions: '--experimental-vm-modules',
    });

    expect(result.exitCode).toBe(0);
  });
});
