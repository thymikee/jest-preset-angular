const { exampleAppsToRun } = require('./paths');
const execa = require('execa');
const fs = require('fs');
const path = require('path');
const logger = require('./logger');
const glob = require('glob');

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
  if (ngVersion !== 10) {
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
