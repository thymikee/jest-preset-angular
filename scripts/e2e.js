#!/usr/bin/env node
'use strict'

const { existsSync, realpathSync } = require('fs')
const { resolve, join } = require('path')

const { spawnSync } = require('./lib/spawn-sync')
const { projectsToRun } = require('./lib/paths')
const logger = require('./lib/logger')
const { createBundle } = require('./lib/bundle')
const npm = require('./lib/npm')

const jestArgs = process.argv.slice(3)

const executeTest = (monorepoRealPath, bundle) => {
  // we change current directory
  process.chdir(monorepoRealPath)

  // reading package.json
  const projectPkg = require(join(monorepoRealPath, 'package.json'))
  if (!projectPkg.name) projectPkg.name = 'unknown'
  if (!projectPkg.version) projectPkg.version = 'unknown'

  logger.log()
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  logger.log('='.repeat(20), `${projectPkg.name}@${projectPkg.version}`, 'in', monorepoRealPath, '='.repeat(20))
  logger.log()

  // then we install it in the repo
  logger.log('ensuring all depedencies of target project are installed')
  npm.spawnSync(['install', '--no-package-lock', '--no-shrinkwrap', '--no-save'], true,{ cwd: monorepoRealPath })
  logger.log('installing bundled version of jest-preset-angular')
  npm.spawnSync(['install', '--no-package-lock', '--no-shrinkwrap', '--no-save', bundle], true, { cwd: monorepoRealPath })

  // then we can run the tests
  const useYarn = existsSync(join(monorepoRealPath, 'yarn.lock'))
  const cmdLine = projectPkg.scripts && projectPkg.scripts.test ? [useYarn ? 'yarn' : 'npm', 'test'] : ['jest']
  if (jestArgs.length) {
    cmdLine.push('--')
    cmdLine.push(...jestArgs)
  }

  logger.log('starting the tests using:', ...cmdLine)
  logger.log()

  spawnSync(cmdLine.shift(), cmdLine, {
    cwd: monorepoRealPath,
    stdio: 'inherit',
    env: process.env,
  })
}

const cwd = process.cwd()
// first we need to create a bundle
const bundle = createBundle()
projectsToRun.forEach((monorepoPath) => {
  let monorepoRealPath
  try {
    monorepoRealPath = realpathSync(resolve(cwd, monorepoPath))
  } catch (e) {
    monorepoRealPath = undefined
  }
  executeTest(monorepoRealPath, bundle)
})
