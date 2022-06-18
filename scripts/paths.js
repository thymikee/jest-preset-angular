const { lstatSync, existsSync } = require('fs');
const path = require('path');

const glob = require('glob');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'build');
const exampleAppsToRun = glob
  .sync('examples/*')
  .map((examplePath) => path.join(process.cwd(), examplePath))
  .filter((examplePath) => lstatSync(examplePath).isDirectory() && existsSync(path.join(examplePath, 'package.json')))
  .sort((a, b) => {
    const ngVersion1 = +a.substring(a.indexOf('v') + 1);
    const ngVersion2 = +b.substring(a.indexOf('v') + 1);

    return ngVersion1 > ngVersion2 ? 1 : -1;
  });

module.exports = {
  rootDir,
  distDir,
  exampleAppsToRun,
};
