const { babelAngularConfig } = require('jest-preset-angular/build/babel/babel.config')
module.exports = api => {
  api.cache(false)
  return {
    presets: babelAngularConfig.presets,
    plugins: [
      ...babelAngularConfig.plugins,
      // your plugins
    ]
  }
}

