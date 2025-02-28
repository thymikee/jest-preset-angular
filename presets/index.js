const ngJestPresets = require('../build/presets');

module.exports = {
    createCjsPreset: ngJestPresets.createCjsPreset,
    createEsmPreset: ngJestPresets.createEsmPreset,
};
