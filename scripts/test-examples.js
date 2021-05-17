const { join } = require('path');

const execa = require('execa');

const logger = require('./logger');
const { exampleAppsToRun, rootDir } = require('./paths');

const jestArgs = process.argv.slice(3);

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

  // then we install it in the repo
  logger.log('ensuring all dependencies of target project are installed');

  execa.sync('npm', ['ci'], { cwd: projectPath });

  logger.log('installing bundled version of jest-preset-angular');

  execa.sync('npm', ['install', '--no-package-lock', '--no-shrinkwrap', '--no-save', bundlePath], { cwd: projectPath });
  // then we can run the tests
  const cmdLine = ['yarn', 'test'];
  const cmdESMLine = ['yarn', 'test-esm'];
  if (jestArgs.length) {
    cmdLine.push('--');
    cmdESMLine.push('--');
    cmdLine.push(...jestArgs);
    cmdESMLine.push(...jestArgs);
  }

  logger.log('starting the CommonJS tests using:', ...cmdLine);
  logger.log();

  execa.sync(cmdLine.shift(), cmdLine, {
    cwd: projectPath,
    stdio: 'inherit',
    env: process.env,
  });

  logger.log('starting the ESM tests using:', ...cmdESMLine);
  logger.log();

  execa.sync(cmdESMLine.shift(), cmdESMLine, {
    cwd: projectPath,
    stdio: 'inherit',
    env: process.env,
  });
};

// This will trigger the build as well (not using yarn since yarn pack is buggy)
const createBundle = () => {
  logger.log('creating jest-preset-angular bundle');

  const res = execa.sync('npm', ['-s', 'pack'], { cwd: rootDir });
  const stdOutStr = res.stdout.toString().trim();

  return join(rootDir, stdOutStr.substring(stdOutStr.indexOf('jest-preset-angular')));
};
const bundlePath = createBundle();

exampleAppsToRun.forEach((projectPath) => {
  executeTest(projectPath);
});
