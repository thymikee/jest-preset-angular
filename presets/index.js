const presets = require('../build/presets');

// CommonJS export
module.exports = presets;

// ESM export (for Node.js ESM compatibility)
module.exports.createCjsPreset = presets.createCjsPreset;
module.exports.createEsmPreset = presets.createEsmPreset;
