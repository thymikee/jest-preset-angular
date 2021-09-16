const { exampleAppsToRun, e2eDirsToRun } = require('./paths');
const execa = require('execa');
const fs = require('fs');
const path = require('path');
const logger = require('./logger');
const glob = require('glob');

logger.log(`Updating e2e dependencies' versions (this might take a while)`);
logger.log();

e2eDirsToRun.forEach((e2eDir, idx) => {
  logger.log(`[${idx + 1}/${e2eDirsToRun.length}] updating Angular dependencies of ${e2eDir}:`);
  process.chdir(e2eDir);

  logger.log(`installing dependencies of ${e2eDir}:`);

  execa.sync('yarn');

  const args = ['upgrade'];

  logger.log(`    ↳ yarn ${args.join(' ')}`);

  execa.sync('yarn', args, { cwd: e2eDir });

  logger.log('    cleaning-up');

  execa.sync('rimraf', [path.join(e2eDir, 'node_modules')]);
});

logger.log();
logger.log(`Updating example apps dependencies' versions (this might take a while)`);
logger.log();

exampleAppsToRun.forEach((projectPath, idx) => {
  let angularJsonPath = path.join(projectPath, 'angular.json');
  if (!fs.existsSync(angularJsonPath)) {
    angularJsonPath = glob
      .sync(`${projectPath}/**/angular.json`)
      .filter((angularJsonPath) => !angularJsonPath.includes('node_modules'))[0];
  }
  const angularAppPath = path.dirname(angularJsonPath);
  const ngVersion = +require(path.join(angularAppPath, 'package.json')).version.split('.')[0];

  logger.log(`[${idx + 1}/${exampleAppsToRun.length}] updating Angular dependencies of ${angularAppPath}:`);
  process.chdir(angularAppPath);

  logger.log(`installing dependencies of ${projectPath}:`);

  execa.sync('yarn', ['install'], { cwd: projectPath });

  const args = [
    'update',
    `@angular/cli@${ngVersion}`,
    `@angular/core@${ngVersion}`,
    'jest@latest',
    'jest-preset-angular@latest',
    '@types/jest@latest',
  ];
  if (ngVersion !== 9 && ngVersion !== 10) {
    args.push('zone.js@latest');
  }
  args.push('--force');

  logger.log(`    ↳ ng ${args.join(' ')}`);

  execa.sync('ng', args, { cwd: angularAppPath });

  logger.log('    cleaning-up');

  execa.sync('rimraf', [path.join(projectPath, 'node_modules')]);
});

logger.log();
logger.log('Done!');
process.exit(0);
