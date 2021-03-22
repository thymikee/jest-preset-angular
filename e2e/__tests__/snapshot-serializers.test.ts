import runJest from '../run-jest';
import { onNodeVersions } from '../utils';

test('use snapshot serializers', () => {
  const result = runJest('snapshot-serializers');

  expect(result.exitCode).toBe(0);
});

onNodeVersions('^12.17.0 || >=13.2.0', () => {
  test('use snapshot serializers in ESM mode', () => {
    const result = runJest('snapshot-serializers', ['-c=jest-esm.config.js'], {
      nodeOptions: '--experimental-vm-modules',
    });

    expect(result.exitCode).toBe(0);
  });
});
