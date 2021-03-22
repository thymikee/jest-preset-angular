import runJest from '../run-jest';
import { onNodeVersions } from '../utils';

test('support waitForAsync/fakeAsync', () => {
  const result = runJest('async');

  expect(result.exitCode).toBe(0);
});

onNodeVersions('^12.17.0 || >=13.2.0', () => {
  test('support waitForAsync/fakeAsync in ESM mode', () => {
    const result = runJest('async', ['-c=jest-esm.config.js'], {
      nodeOptions: '--experimental-vm-modules',
    });

    expect(result.exitCode).toBe(0);
  });
});
