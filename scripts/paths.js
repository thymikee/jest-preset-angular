const { lstatSync, existsSync } = require('fs');
const path = require('path');

const glob = require('glob');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'build');
const examplesRootDir = path.join(rootDir, 'examples');
const e2eRootDir = path.join(rootDir, 'e2e');
const projectsToRun = glob
  .sync(`${examplesRootDir}/*`)
  .filter((examplePath) => lstatSync(examplePath).isDirectory() && existsSync(path.join(examplePath, 'package.json')));
const e2eDirsToRun = glob
  .sync(`${e2eRootDir}/*`)
  .filter((e2ePath) => lstatSync(e2ePath).isDirectory() && existsSync(path.join(e2ePath, 'package.json')));

module.exports = {
  rootDir,
  distDir,
  projectsToRun,
  e2eDirsToRun,
};
