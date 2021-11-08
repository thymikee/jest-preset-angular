import path from 'path';

import { json as runWithJson } from '../run-jest';
import { runYarnInstall } from '../utils';

const DIR = path.join(__dirname, '..', 'babel-support');

beforeAll(() => {
  runYarnInstall(DIR);
});

test(`successfully runs the tests inside ${DIR} with isolatedModules: false`, () => {
  const { json } = runWithJson(DIR);

  expect(json.success).toBe(true);
});

test(`successfully runs the tests inside ${DIR} with isolatedModules: true`, () => {
  const { json } = runWithJson(DIR, ['-c=jest-isolated.config.js']);

  expect(json.success).toBe(true);
});
