#!/usr/bin/env node
'use strict';

const execa = require('execa');
const { existsSync, realpathSync, mkdirSync } = require('fs');
const { copySync } = require('fs-extra');
const { resolve, join } = require('path');

const { projectsToRun } = require('./paths');
const logger = require('./logger');

const jestArgs = process.argv.slice(3);

const executeTest = (projectRealPath) => {
  // we change current directory
  process.chdir(projectRealPath);

  // reading package.json
  const projectPkg = require(join(projectRealPath, 'package.json'));
  if (!projectPkg.name) projectPkg.name = 'unknown';
  if (!projectPkg.version) projectPkg.version = 'unknown';

  logger.log();
  logger.log('='.repeat(20), `${projectPkg.name}@${projectPkg.version}`, 'in', projectRealPath, '='.repeat(20));
  logger.log();

  // then we install it in the repo
  logger.log('ensuring all dependencies of target project are installed');

  execa.sync('yarn', ['install', '--frozen-lockfile'], { cwd: projectRealPath });

  logger.log('copying distributed assets to target project');

  const presetDir = join(projectRealPath, 'node_modules', 'jest-preset-angular');
  if (!existsSync(presetDir)) {
    mkdirSync(presetDir);
  }
  copySync(join(cwd, 'jest-preset.js'), `${presetDir}/jest-preset.js`);
  copySync(join(cwd, 'setup-jest.js'), `${presetDir}/setup-jest.js`);
  copySync(join(cwd, 'package.json'), `${presetDir}/package.json`);
  copySync(join(cwd, 'build'), `${presetDir}/build`);

  // then we can run the tests
  const cmdLine = projectPkg.scripts && projectPkg.scripts.test ? ['yarn', 'test'] : ['jest'];
  if (jestArgs.length) {
    cmdLine.push('--');
    cmdLine.push(...jestArgs);
  }

  logger.log('starting the tests using:', ...cmdLine);
  logger.log();

  execa.sync(cmdLine.shift(), cmdLine, {
    cwd: projectRealPath,
    stdio: 'inherit',
    env: process.env,
  });
};

const cwd = process.cwd();

logger.log('creating jest-preset-angular bundle');

execa.sync('yarn', ['build']);

projectsToRun.forEach((projectPath) => {
  let projectRealPath;
  try {
    projectRealPath = realpathSync(resolve(cwd, projectPath));
  } catch (e) {
    projectRealPath = undefined;
  }
  executeTest(projectRealPath);
});
