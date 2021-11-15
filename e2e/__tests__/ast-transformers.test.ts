import { jsonNoCache as runWithJsonNoCache } from '../run-jest';

describe('hoisting', () => {
  const DIR = 'ast-transformers/hoisting';

  test(`successfully runs the tests inside ${DIR} with isolatedModules: false`, () => {
    const { json } = runWithJsonNoCache(DIR);

    expect(json.success).toBe(true);
  });

  test(`successfully runs the tests inside ${DIR} with isolatedModules: true`, () => {
    const { json } = runWithJsonNoCache(DIR, ['-c=jest-isolated.config.js']);

    expect(json.success).toBe(true);
  });
});

describe('ng-jit-transformers', () => {
  const DIR = 'ast-transformers/ng-jit-transformers';

  test(`successfully runs the tests inside ${DIR} with isolatedModules: false`, () => {
    const { json } = runWithJsonNoCache(DIR);

    expect(json.success).toBe(true);
  });

  test(`successfully runs the tests inside ${DIR} with isolatedModules: true`, () => {
    const { json } = runWithJsonNoCache(DIR, ['-c=jest-isolated.config.js']);

    expect(json.success).toBe(true);
  });
});
