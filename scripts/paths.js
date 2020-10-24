const glob = require('glob');
const { lstatSync } = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'build');
const e2eRootDir = path.join(rootDir, 'e2e');
const projectsToRun = glob.sync(`${e2eRootDir}/*`).filter((path) => lstatSync(path).isDirectory());

module.exports = {
  rootDir,
  distDir,
  projectsToRun,
};
