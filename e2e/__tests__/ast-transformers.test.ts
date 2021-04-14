import runJest from '../run-jest';
import { onNodeVersions } from '../utils';

test(`use hoisting ast transformer from 'ts-jest'`, () => {
  const result = runJest('ast-transformers/hoisting');

  expect(result.exitCode).toBe(0);
});

test(`use downlevel ctor ast transformer internally`, () => {
  const result = runJest('ast-transformers/downlevel-ctor');

  expect(result.exitCode).toBe(0);
});

test('use replace-resources ast transformer internally', () => {
  const result = runJest('ast-transformers/replace-resources');

  expect(result.exitCode).toBe(0);
});

onNodeVersions('^12.17.0 || >=13.2.0', () => {
  test(`use downlevel ctor ast transformer internally in ESM mode`, () => {
    const result = runJest('ast-transformers/downlevel-ctor', ['-c=jest-esm.config.js'], {
      nodeOptions: '--experimental-vm-modules',
    });

    expect(result.exitCode).toBe(0);
  });

  test('use replace-resources ast transformer internally in ESM mode', () => {
    const result = runJest('ast-transformers/replace-resources', ['-c=jest-esm.config.js'], {
      nodeOptions: '--experimental-vm-modules',
    });

    expect(result.exitCode).toBe(0);
  });
});
