const { exampleAppsToRun } = require('./paths');
const execa = require('execa');
const path = require('path');
const logger = require('./logger');

logger.log('Updating example apps dependency versions (this might take a while)');

exampleAppsToRun.forEach((projectPath, i) => {
  const ngVersion = +projectPath.substring(projectPath.indexOf('-v') + 2);

  logger.log(`[${i + 1}/${exampleAppsToRun.length}] updating Angular dependencies of ${projectPath}:`);
  process.chdir(projectPath);

  logger.log(`installing dependencies of ${projectPath}:`);

  execa.sync('npm', ['ci']);

  const args = ['update', `@angular/cli@${ngVersion}`, `@angular/core@${ngVersion}`, 'jest@next', '@types/jest@latest'];
  if (ngVersion !== 9 && ngVersion !== 10) {
    args.push('zone.js@latest');
  }
  args.push('--force');

  logger.log(`    ↳ ng ${args.join(' ')}`);

  execa.sync('ng', args, { cwd: projectPath });

  logger.log('    cleaning-up');

  execa.sync('rimraf', [path.join(projectPath, 'node_modules')]);
});

logger.log('Done!');
process.exit(0);
