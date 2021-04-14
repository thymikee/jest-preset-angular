import runJest from '../run-jest';
import { onNodeVersions } from '../utils';

test('support @jest/globals', () => {
  const result = runJest('jest-globals');

  expect(result.exitCode).toBe(0);
});

onNodeVersions('^12.17.0 || >=13.2.0', () => {
  test('support @jest/globals in ESM mode', () => {
    const result = runJest('jest-globals', ['-c=jest-esm.config.js'], {
      nodeOptions: '--experimental-vm-modules',
    });

    expect(result.exitCode).toBe(0);
  });
});
