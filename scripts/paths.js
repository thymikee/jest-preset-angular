const { lstatSync, existsSync } = require('fs');
const path = require('path');

const glob = require('glob');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'build');
const examplesRootDir = path.join(rootDir, 'examples');
const projectsToRun = glob
  .sync(`${examplesRootDir}/*`)
  .filter((examplePath) => lstatSync(examplePath).isDirectory() && existsSync(path.join(examplePath, 'package.json')));

module.exports = {
  rootDir,
  distDir,
  projectsToRun,
};
