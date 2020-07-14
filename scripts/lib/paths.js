const path = require('path')

const rootDir = path.resolve(__dirname, '..', '..')
const distDir = path.join(rootDir, 'build')
const e2eRootDir = path.join(rootDir, 'e2e')
const projectsToRun = [
  `${e2eRootDir}/test-app-v9`,
  `${e2eRootDir}/test-app-v10`,
]

module.exports = {
  rootDir,
  distDir,
  projectsToRun,
}
