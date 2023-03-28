module.exports = function (api) {
  api.cache(true);

  const presets = ['@babel/preset-env'];
  const plugins = ['@babel/plugin-transform-async-to-generator', '@babel/plugin-proposal-async-generator-functions'];

  return {
    presets,
    plugins,
  };
};
