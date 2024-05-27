import path from 'path';

import { jsonNoCache as runWithJsonNoCache } from '../run-jest';
import { runYarnInstall } from '../utils';

const DIR = 'async';

beforeAll(() => {
    runYarnInstall(path.join(__dirname, '..', DIR));
});

test(`successfully run the tests inside ${DIR} with isolatedModules: false`, () => {
    const { json } = runWithJsonNoCache(DIR);

    expect(json.success).toBe(true);
});

test(`successfully run the tests inside ${DIR} with isolatedModules: true`, () => {
    const { json } = runWithJsonNoCache(DIR, ['-c=jest-isolated.config.js']);

    expect(json.success).toBe(true);
});
