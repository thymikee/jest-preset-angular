const paths = require('./paths');
const path = require('path');
const execa = require('execa');
const logger = require('./logger');

logger.log('ensuring all dependencies of e2e test cases are installed');

paths.e2eDirsToRun.forEach((e2eDir) => {
  const depsToInstall = !!require(path.join(e2eDir, 'package.json')).dependencies;
  if (depsToInstall) {
    execa.sync('yarn', ['install'], { cwd: e2eDir });
  }
});
