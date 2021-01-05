#!/usr/bin/env node
'use strict';

const execa = require('execa');
const { realpathSync, mkdirSync } = require('fs');
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

  logger.log('setting NG_VERSION environment variable');
  const projectName = projectRealPath.match(/([^\\/]*)\/*$/)[1];
  process.env.NG_VERSION = projectName.substring(projectName.lastIndexOf('-') + 1);

  // then we install it in the repo
  logger.log('ensuring all dependencies of target project are installed');

  execa.sync('yarn', ['install'], { cwd: projectRealPath });

  logger.log('cleaning old assets in target project');

  const testCasesDest = join(projectRealPath, 'src', '__tests__');
  const presetDir = join(projectRealPath, 'node_modules', 'jest-preset-angular');
  execa.sync('rimraf', [presetDir]);
  execa.sync('rimraf', [testCasesDest]);
  mkdirSync(presetDir);

  logger.log('copying distributed assets to target project');

  copySync(join(cwd, 'jest-preset.js'), `${presetDir}/jest-preset.js`);
  copySync(join(cwd, 'ngcc-jest-processor.js'), `${presetDir}/ngcc-jest-processor.js`);
  copySync(join(cwd, 'setup-jest.js'), `${presetDir}/setup-jest.js`);
  copySync(join(cwd, 'package.json'), `${presetDir}/package.json`);
  copySync(join(cwd, 'build'), `${presetDir}/build`);

  logger.log('copying test cases to target project');

  copySync(join(cwd, 'e2e', '__tests__'), testCasesDest);

  // then we can run the tests
  const cmdCjsUnIso = ['yarn', 'test-cjs-uniso'];
  const cmdCjsIso = ['yarn', 'test-cjs-iso'];
  // const cmdESMIso = ['yarn', 'test-esm-iso'];
  if (jestArgs.length) {
    cmdCjsUnIso.push('--');
    cmdCjsIso.push('--');
    // cmdESMIso.push('--');
    cmdCjsUnIso.push(...jestArgs);
    cmdCjsIso.push(...jestArgs);
    // cmdESMIso.push(...jestArgs);
  }

  logger.log('starting non isolatedModules tests');
  logger.log();
  logger.log('starting the CJS tests using:', ...cmdCjsUnIso);
  logger.log();

  execa.sync(cmdCjsUnIso.shift(), cmdCjsUnIso, {
    cwd: projectRealPath,
    stdio: 'inherit',
    env: process.env,
  });

  logger.log('starting isolatedModules tests');
  logger.log();
  logger.log('setting SKIP_TEST environment variable for isolatedModules true');
  process.env.SKIP_TEST = 'true';

  logger.log('starting the CommonJS tests using:', ...cmdCjsIso);
  logger.log();

  execa.sync(cmdCjsIso.shift(), cmdCjsIso, {
    cwd: projectRealPath,
    stdio: 'inherit',
    env: process.env,
  });

  // logger.log('starting the ESM tests using:', ...cmdCjsIso);
  // logger.log();
  //
  // execa.sync(cmdESMIso.shift(), cmdESMIso, {
  //   cwd: projectRealPath,
  //   stdio: 'inherit',
  //   env: process.env,
  // });

  logger.log('cleaning up');

  execa.sync('rimraf', [testCasesDest]);
  delete process.env.NG_VERSION;
  delete process.env.SKIP_TEST;
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
