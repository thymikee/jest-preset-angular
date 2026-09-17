import { importB } from '../src/a.mjs';

test('should work with dynamic import in mjs module', async () => {
    await expect(importB()).resolves.toBe('b');
});
