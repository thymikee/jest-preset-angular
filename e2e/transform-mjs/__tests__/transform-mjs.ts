// @ts-expect-error TypeScript < 4.5 doesn't support `.mjs` import
import * as foo from '../foo.mjs';

test('should transform mjs files', async () => {
  expect(foo.pi).toBeDefined();
});
