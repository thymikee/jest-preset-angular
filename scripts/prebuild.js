const { buildSync } = require('esbuild');

buildSync({
  entryPoints: ['src/transformers/downlevel-ctor.ts'],
  outdir: 'build',
  external: ['esbuild', 'ts-jest', 'typescript'],
  platform: 'node',
  target: 'node16',
  bundle: true,
});
