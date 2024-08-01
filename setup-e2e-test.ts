import { existsSync } from 'node:fs';
import path from 'node:path';

import { sync as spawnSync } from 'execa';
import { sync as globSync } from 'glob';

const globalSetup = async () => {
    const e2eFoldersToInstallDeps = globSync('e2e/*')
        .map((folderPath) => path.join(process.cwd(), folderPath))
        .filter((folderPath) => existsSync(path.join(folderPath, 'package.json')));

    e2eFoldersToInstallDeps.forEach((folderPath) => {
        spawnSync('yarn', ['install'], {
            cwd: folderPath,
        });
    });
};

export default globalSetup;
