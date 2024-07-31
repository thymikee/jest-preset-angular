import { existsSync } from 'node:fs';
import path from 'node:path';

import type { Config } from '@jest/types';
import { sync as spawnSync } from 'execa';
import { sync as globSync } from 'glob';

const e2eFoldersToInstallDeps = globSync('e2e/*')
    .map((folderPath) => path.join(process.cwd(), folderPath))
    .filter((folderPath) => existsSync(path.join(folderPath, 'package.json')));

e2eFoldersToInstallDeps.forEach((folderPath) => {
    spawnSync('yarn', ['install'], {
        cwd: folderPath,
    });
});

const config: Config.InitialOptions = {
    projects: ['e2e/**/jest-cjs.config.ts'],
};

export default config;
