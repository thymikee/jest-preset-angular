const { lstatSync, existsSync } = require('fs');
const path = require('path');

const glob = require('glob');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'build');
const examplesRootDir = path.join(rootDir, 'examples');
const e2eRootDir = path.join(rootDir, 'e2e');
const exampleAppsToRun = glob
  .sync(`${examplesRootDir}/*`)
  .filter((examplePath) => lstatSync(examplePath).isDirectory() && existsSync(path.join(examplePath, 'package.json')))
  .sort((a, b) => {
    const ngVersion1 = +a.substring(a.indexOf('v') + 1);
    const ngVersion2 = +b.substring(a.indexOf('v') + 1);

    return ngVersion1 > ngVersion2 ? 1 : -1;
  });
const e2eDirsToRun = glob
  .sync(`${e2eRootDir}/*`)
  .filter(
    (e2ePath) =>
      lstatSync(e2ePath).isDirectory() &&
      existsSync(path.join(e2ePath, 'package.json')) &&
      existsSync(path.join(e2ePath, 'yarn.lock'))
  )
  .sort();

module.exports = {
  rootDir,
  distDir,
  exampleAppsToRun,
  e2eDirsToRun,
};
