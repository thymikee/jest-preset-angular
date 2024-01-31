import path from 'path';

import { jsonNoCache as runWithJsonNoCache } from '../run-jest';
import { runYarnInstall } from '../utils';

const DIR = 'process-js-packages';

beforeAll(() => {
  runYarnInstall(path.join(__dirname, '..', DIR));
});

test(`successfully run the tests inside ${DIR} with CommonJS mode`, () => {
  const { json } = runWithJsonNoCache(DIR);

  expect(json.success).toBe(true);
});
