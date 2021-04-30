const { projectsToRun } = require('./paths');
const execa = require('execa');
const path = require('path');
const logger = require('./logger');

logger.log('Updating example apps dependency versions (this might take a while)');

projectsToRun.forEach((projectPath, i) => {
  const ngVersion = +projectPath.substring(projectPath.indexOf('-v') + 2);

  logger.log(`[${i + 1}/${projectsToRun.length}] updating Angular dependencies of ${projectPath}:`);
  process.chdir(projectPath);

  logger.log(`installing dependencies of ${projectPath}:`);

  execa.sync('yarn');

  const args = ['update', `@angular/cli@${ngVersion}`, `@angular/core@${ngVersion}`];
  if (ngVersion === 11) {
    args.push('zone.js@latest');
  }

  logger.log(`    ↳ ng ${args.join(' ')}`);

  execa.sync('ng', args, { cwd: projectPath });

  logger.log('    cleaning-up');

  execa.sync('rimraf', [path.join(projectPath, 'node_modules')]);
});

logger.log('Done!');
process.exit(0);
