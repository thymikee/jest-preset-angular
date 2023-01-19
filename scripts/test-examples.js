const { join } = require('path');
const { copySync } = require('fs-extra');

const execa = require('execa');

const logger = require('./logger');
const { exampleAppsToRun, rootDir } = require('./paths');

const executeTest = (projectPath) => {
  // we change current directory
  process.chdir(projectPath);

  // reading package.json
  const projectPkg = require(join(projectPath, 'package.json'));
  if (!projectPkg.name) projectPkg.name = 'unknown';
  if (!projectPkg.version) projectPkg.version = 'unknown';

  logger.log();
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  logger.log('='.repeat(20), `${projectPkg.name}@${projectPkg.version}`, 'in', projectPath, '='.repeat(20));
  logger.log();

  logger.log('cleaning up');
  logger.log();

  execa.sync('rimraf', [join(projectPath, 'node_modules')]);

  // then we install it in the repo
  logger.log('ensuring all dependencies of target project are installed');
  logger.log();

  execa.sync('yarn', ['install'], { cwd: projectPath });
  logger.log();

  logger.log('installing bundled version of jest-preset-angular');
  logger.log();

  [
    'build',
    'presets',
    'global-setup.js',
    'global-setup.mjs',
    'jest-preset.js',
    'package.json',
    'setup-jest.js',
    'setup-jest.mjs',
  ].forEach((asset) => {
    const assetToReplace = join(projectPath, 'node_modules', 'jest-preset-angular', asset);
    const assetToCopy = join(rootDir, asset);
    copySync(assetToCopy, assetToReplace, {});
  });

  logger.log('installing bundled version of ts-jest');
  logger.log();

  const assetToReplace = join(projectPath, 'node_modules', 'ts-jest');
  const assetToCopy = join(rootDir, 'node_modules', 'ts-jest');

  copySync(assetToCopy, assetToReplace, {});

  // then we can run the tests
  const cmdLine = ['yarn', 'test'];
  const cmdIsolatedLine = ['yarn', 'test-isolated'];
  const cmdESMLine = ['yarn', 'test-esm'];
  const cmdESMIsolatedLine = ['yarn', 'test-esm-isolated'];

  logger.log('starting the CommonJS tests with isolatedModules: false using:', ...cmdLine);
  logger.log();

  execa.sync(cmdLine.shift(), cmdLine, {
    cwd: projectPath,
    stdio: 'inherit',
    env: process.env,
  });

  logger.log();
  logger.log('starting the CommonJS tests with isolatedModules: true using:', ...cmdIsolatedLine);
  logger.log();

  execa.sync(cmdIsolatedLine.shift(), cmdIsolatedLine, {
    cwd: projectPath,
    stdio: 'inherit',
    env: process.env,
  });

  logger.log();
  logger.log('starting the ESM tests with isolatedModules: false using:', ...cmdESMLine);
  logger.log();

  execa.sync(cmdESMLine.shift(), cmdESMLine, {
    cwd: projectPath,
    stdio: 'inherit',
    env: process.env,
  });

  logger.log();
  logger.log('starting the ESM tests with isolatedModules: true using:', ...cmdESMIsolatedLine);
  logger.log();

  execa.sync(cmdESMIsolatedLine.shift(), cmdESMIsolatedLine, {
    cwd: projectPath,
    stdio: 'inherit',
    env: process.env,
  });
};

// This will trigger the build as well (not using yarn since yarn pack is buggy)
logger.log('creating jest-preset-angular bundle');

execa.sync('yarn', ['build']);

exampleAppsToRun.forEach((projectPath) => {
  executeTest(projectPath);
});
