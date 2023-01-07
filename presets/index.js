const ngJestPresets = require('../build/presets');

module.exports = {
  defaults: ngJestPresets.defaultPreset,
  defaultsESM: ngJestPresets.defaultEsmPreset,
  defaultTransformerOptions: ngJestPresets.defaultTransformerOptions,
};
