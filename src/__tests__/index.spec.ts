describe('AngularJestTransformer', () => {
  describe('getCacheKey', () => {
    it('should be different for each argument value', () => {
      // eslint-disable-next-line
      const tr = require('../');
      const input = {
        fileContent: 'export default "foo"',
        fileName: 'foo.ts',
        jestConfigStr: '{"foo": "bar"}',
        // eslint-disable-next-line
        options: { config: { foo: 'bar' } as any, instrument: false, rootDir: '/foo' },
      };
      const keys = [
        tr.getCacheKey(input.fileContent, input.fileName, input.jestConfigStr, input.options),
        tr.getCacheKey(input.fileContent, 'bar.ts', input.jestConfigStr, input.options),
        tr.getCacheKey(input.fileContent, input.fileName, '{}', { ...input.options, instrument: true }),
        tr.getCacheKey(input.fileContent, input.fileName, '{}', { ...input.options, rootDir: '/bar' }),
      ];
      // each key should have correct length
      for (const key of keys) {
        expect(key).toHaveLength(32);
      }
    });
  });
});
