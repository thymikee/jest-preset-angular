import { existsSync, lstatSync } from 'node:fs';
import path from 'node:path';

import { sync as globSync } from 'glob';

const rootDir = path.resolve(__dirname, '..');
const exampleAppsToRun = globSync('examples/*')
    .map((examplePath) => path.join(process.cwd(), examplePath))
    .filter((examplePath) => lstatSync(examplePath).isDirectory() && existsSync(path.join(examplePath, 'package.json')))
    .sort((a, b) => {
        const ngVersion1 = +a.substring(a.indexOf('v') + 1);
        const ngVersion2 = +b.substring(a.indexOf('v') + 1);

        return ngVersion1 > ngVersion2 ? 1 : -1;
    });

export { rootDir, exampleAppsToRun };
