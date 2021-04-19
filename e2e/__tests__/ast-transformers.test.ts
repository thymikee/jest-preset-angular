import runJest from '../run-jest';
import { onNodeVersions } from '../utils';

const INTERNAL_TRANSFORMER_NAMES = ['downlevel-ctor', 'replace-resources'];
test.each([
  ...INTERNAL_TRANSFORMER_NAMES,
  'hoisting', // from `ts-jest`
])('use %s ast transformer in CJS mode', (astTransformerName) => {
  const result = runJest(`ast-transformers/${astTransformerName}`);

  expect(result.exitCode).toBe(0);
});

onNodeVersions('^12.17.0 || >=13.2.0', () => {
  test.each(INTERNAL_TRANSFORMER_NAMES)('use %s ast transformer in ESM mode', (astTransformerName) => {
    const result = runJest(`ast-transformers/${astTransformerName}`, ['-c=jest-esm.config.js'], {
      nodeOptions: '--experimental-vm-modules',
    });

    expect(result.exitCode).toBe(0);
  });
});
