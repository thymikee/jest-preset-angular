#!/usr/bin/env node
'use strict';

const execa = require('execa');
const { realpathSync } = require('fs');
const { resolve, join } = require('path');

const { projectsToRun } = require('./lib/paths');
const logger = require('./lib/logger');

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

  logger.log('removing existing node_modules of target project');

  execa.sync('rimraf', ['node_modules'], { cwd: projectRealPath });

  // then we install it in the repo
  logger.log('ensuring all dependencies of target project are installed');

  execa.sync('yarn', ['install', '--frozen-lockfile'], { cwd: projectRealPath });

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
projectsToRun.forEach((projectPath) => {
  let projectRealPath;
  try {
    projectRealPath = realpathSync(resolve(cwd, projectPath));
  } catch (e) {
    projectRealPath = undefined;
  }
  executeTest(projectRealPath);
});
