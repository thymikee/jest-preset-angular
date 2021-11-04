import child_process from 'child_process';

describe('ngcc-jest-processor', () => {
  test.concurrent.each(['--clearCache', '--help', '--init', '--listTests', '--showConfig'])(
    'should not run ngcc when having excluded Jest args',
    async (ignoreArg) => {
      child_process.spawnSync = jest.fn();
      process.argv.push(ignoreArg);

      await import('../utils/ngcc-jest-processor');

      expect(child_process.spawnSync).not.toHaveBeenCalled();
    },
  );

  test.concurrent('should run ngcc when not having excluded Jest args with successful result', async () => {
    const mockedSpawnSync = (child_process.spawnSync = jest.fn().mockReturnValueOnce({
      status: 0,
    }));
    process.argv = [];
    process.stdout.write = jest.fn();

    await import('../utils/ngcc-jest-processor');

    expect(process.stdout.write).toHaveBeenCalledWith('ngcc-jest-processor: running ngcc\n');
    expect(mockedSpawnSync).toHaveBeenCalled();
    expect(
      mockedSpawnSync.mock.calls[0][1].map((callArg: string) =>
        callArg.includes('node_modules')
          ? callArg.substring(callArg.indexOf('node_modules')).replace(/\\/g, '/')
          : callArg,
      ),
    ).toMatchInlineSnapshot(`
      Array [
        "node_modules/@angular/compiler-cli/bundles/ngcc/main-ngcc.js",
        "--source",
        "node_modules/",
        "--properties",
        "es2015",
        "main",
        "--first-only",
        "false",
        "--async",
      ]
    `);
  });
});
