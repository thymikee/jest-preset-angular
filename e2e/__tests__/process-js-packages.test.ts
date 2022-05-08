import path from 'path';

import { onNodeVersions, jsonNoCache as runWithJsonNoCache } from '../run-jest';
import { runYarnInstall } from '../utils';

const DIR = 'process-js-packages';

beforeAll(() => {
  runYarnInstall(path.join(__dirname, '..', DIR));
});

test(`successfully run the tests inside ${DIR} with CommonJS mode`, () => {
  const { json } = runWithJsonNoCache(DIR);

  expect(json.success).toBe(true);
});

// The versions where vm.Module exists and commonjs with "exports" is not broken
onNodeVersions('>=12.16.0', () => {
  test(`successfully run the tests inside ${DIR} with ESM mode`, () => {
    const { json } = runWithJsonNoCache(DIR, ['-c=jest-esm.config.mjs'], {
      nodeOptions: '--experimental-vm-modules --no-warnings',
    });

    expect(json.success).toBe(true);
  });
});
