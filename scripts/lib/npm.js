const { spawnSync: spawn } = require('./spawn-sync')
const memoize = require('lodash.memoize')

const version = memoize(() => spawnSync(['-s', '--version']).stdout.toString().trim())

const spawnSync = (args, useNpm, options = {}) => spawn(useNpm ? 'npm' : 'yarn', args, options)

module.exports = {
  version,
  spawnSync,
}
