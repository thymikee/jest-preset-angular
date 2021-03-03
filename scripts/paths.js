const glob = require('glob');
const { lstatSync, existsSync } = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'build');
const e2eRootDir = path.join(rootDir, 'e2e');
const projectsToRun = glob
  .sync(`${e2eRootDir}/*`)
  .filter((e2ePath) => lstatSync(e2ePath).isDirectory() && existsSync(path.join(e2ePath, 'package.json')));

module.exports = {
  rootDir,
  distDir,
  projectsToRun,
};
