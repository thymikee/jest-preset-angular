import { importB } from '../__test_modules__/a.mjs';

test('should work with dynamic import in mjs module', async () => {
    await expect(importB()).resolves.toBe('b');
});
