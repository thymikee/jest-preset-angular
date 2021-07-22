const { exampleAppsToRun, e2eDirsToRun } = require('./paths');
const execa = require('execa');
const path = require('path');
const logger = require('./logger');

logger.log('Updating example apps dependency versions (this might take a while)');

e2eDirsToRun.forEach((e2eDir, idx) => {
  logger.log(`[${idx + 1}/${exampleAppsToRun.length}] updating Angular dependencies of ${e2eDir}:`);
  process.chdir(e2eDir);

  logger.log(`installing dependencies of ${e2eDir}:`);

  execa.sync('yarn');

  const args = ['upgrade'];

  logger.log(`    ↳ yarn ${args.join(' ')}`);

  execa.sync('yarn', args, { cwd: e2eDir });

  logger.log('    cleaning-up');

  execa.sync('rimraf', [path.join(e2eDir, 'node_modules')]);
});

// exampleAppsToRun.forEach((projectPath, idx) => {
//   const ngVersion = +require(path.join(projectPath, 'package.json')).version.split('.')[0];
//
//   logger.log(`[${idx + 1}/${exampleAppsToRun.length}] updating Angular dependencies of ${projectPath}:`);
//   process.chdir(projectPath);
//
//   logger.log(`installing dependencies of ${projectPath}:`);
//
//   execa.sync('npm', ['ci']);
//
//   const args = [
//     'update',
//     `@angular/cli@${ngVersion}`,
//     `@angular/core@${ngVersion}`,
//     'jest@latest',
//     '@types/jest@latest',
//   ];
//   if (ngVersion !== 9 && ngVersion !== 10) {
//     args.push('zone.js@latest');
//   }
//   args.push('--force');
//
//   logger.log(`    ↳ ng ${args.join(' ')}`);
//
//   execa.sync('ng', args, { cwd: projectPath });
//
//   logger.log('    cleaning-up');
//
//   execa.sync('rimraf', [path.join(projectPath, 'node_modules')]);
// });

logger.log('Done!');
process.exit(0);
