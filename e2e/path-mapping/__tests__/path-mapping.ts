import { bar } from '@bar/bar-constant';

test('path mapping should work without being affected by resolver', async () => {
  expect(bar).toBe(1);
  await expect(import('@foo/foo-constant')).rejects.toMatchInlineSnapshot(
    `[Error: Cannot find module '@foo/foo-constant' from '__tests__/path-mapping.ts']`,
  );
});
