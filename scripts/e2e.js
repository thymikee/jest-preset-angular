#!/usr/bin/env node
'use strict'

const execa = require('execa')
const { realpathSync } = require('fs')
const { removeSync } = require('fs-extra')
const { resolve, join } = require('path')

const { projectsToRun } = require('./lib/paths')
const logger = require('./lib/logger')
const { createBundle } = require('./lib/bundle')

const jestArgs = process.argv.slice(3)

const executeTest = (projectRealPath, bundle) => {
  // we change current directory
  process.chdir(projectRealPath)

  // reading package.json
  const projectPkg = require(join(projectRealPath, 'package.json'))
  if (!projectPkg.name) projectPkg.name = 'unknown'
  if (!projectPkg.version) projectPkg.version = 'unknown'

  logger.log()
  logger.log('='.repeat(20), `${projectPkg.name}@${projectPkg.version}`, 'in', projectRealPath, '='.repeat(20))
  logger.log()

  // Need to clean up node_modules first before installing package, otherwise npm will throw error.
  removeSync(join(projectRealPath, 'node_modules'))

  /**
   * Bundle needs to be installed first, otherwise node_modules won't be correct. In short, npm -> yarn works but not
   * the other way
   */
  logger.log('installing bundled version of jest-preset-angular')

  execa.sync('npm', ['install', '--no-package-lock', '--no-shrinkwrap', '--no-save', bundle], { cwd: projectRealPath })

  // then we install it in the repo
  logger.log('ensuring all dependencies of target project are installed')

  execa.sync('yarn', ['install', '--frozen-lockfile'], { cwd: projectRealPath })

  // then we can run the tests
  const cmdLine = projectPkg.scripts && projectPkg.scripts.test ? ['yarn', 'test'] : ['jest']
  if (jestArgs.length) {
    cmdLine.push('--')
    cmdLine.push(...jestArgs)
  }

  logger.log('starting the tests using:', ...cmdLine)
  logger.log()

  try {
    execa.sync(cmdLine.shift(), cmdLine, {
      cwd: projectRealPath,
      stdio: 'inherit',
      env: process.env,
    })
  } catch (e) {
    logger.log(e.message)
  }
}

const cwd = process.cwd()
const bundle = createBundle()
projectsToRun.forEach((projectPath) => {
  let projectRealPath
  try {
    projectRealPath = realpathSync(resolve(cwd, projectPath))
  } catch (e) {
    projectRealPath = undefined
  }
  executeTest(projectRealPath, bundle)
})
