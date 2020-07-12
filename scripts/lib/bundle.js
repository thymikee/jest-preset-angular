const npm = require('./npm')
const logger = require('./logger')
const { rootDir } = require('./paths')
const { join } = require('path')

// This will trigger the build as well (not using yarn since yarn pack is buggy)
// Except that on npm < 4.0.0 the prepare doesn't exists

function createBundle(log = logger.log.bind(logger)) {
  log('creating jest-preset-angular bundle')
  const res = npm.spawnSync(['-s', 'pack'], true,{ cwd: rootDir })

  return join(rootDir, res.stdout.toString().trim())
}

module.exports = {
  createBundle,
}
