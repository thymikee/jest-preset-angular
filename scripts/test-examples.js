const { join } = require('path');

const execa = require('execa');
const { mkdirSync } = require('fs');
const { copySync, removeSync } = require('fs-extra');

const logger = require('./logger');
const { projectsToRun } = require('./paths');

const jestArgs = process.argv.slice(3);
const cwd = process.cwd();
const executeTest = (projectPath) => {
  // we change current directory
  process.chdir(projectPath);
  // reading package.json
  const projectPkg = require(join(projectPath, 'package.json'));
  const presetDir = join(projectPath, 'node_modules', 'jest-preset-angular');
  if (!projectPkg.name) projectPkg.name = 'unknown';
  if (!projectPkg.version) projectPkg.version = 'unknown';

  logger.log();
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  logger.log('='.repeat(20), `${projectPkg.name}@${projectPkg.version}`, 'in', projectPath, '='.repeat(20));
  logger.log();

  // then we install it in the repo
  logger.log('ensuring all depedencies of target project are installed');

  execa.sync('yarn', ['install'], { cwd: projectPath });
  removeSync(presetDir);
  mkdirSync(presetDir);

  logger.log('installing bundled version of jest-preset-angular');

  copySync(join(cwd, 'jest-preset.js'), `${presetDir}/jest-preset.js`);
  copySync(join(cwd, 'presets'), `${presetDir}/presets`);
  copySync(join(cwd, 'ngcc-jest-processor.js'), `${presetDir}/ngcc-jest-processor.js`);
  copySync(join(cwd, 'setup-jest.js'), `${presetDir}/setup-jest.js`);
  copySync(join(cwd, 'package.json'), `${presetDir}/package.json`);
  copySync(join(cwd, 'build'), `${presetDir}/build`);
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

logger.log('creating jest-preset-angular bundle');

execa.sync('yarn', ['build']);

projectsToRun.forEach((projectPath) => {
  executeTest(projectPath);
});
