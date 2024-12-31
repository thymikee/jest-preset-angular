const ngJestPresets = require('../build/presets');

module.exports = {
    get defaults() {
        console.warn(`
            This preset is DEPRECATED and will be removed in the next major release.
            Please use "createCjsPreset" function instead. See documentation at https://thymikee.github.io/jest-preset-angular/docs/getting-started/presets#createcjspresetoptions
        `);

        return ngJestPresets.defaultPreset;
    },
    get defaultsESM() {
        console.warn(`
            This preset is DEPRECATED and will be removed in the next major release.
            Please use "createEsmPreset" function instead. See documentation at https://thymikee.github.io/jest-preset-angular/docs/getting-started/presets#createesmpresetoptions
        `);

        return ngJestPresets.defaultEsmPreset;
    },
    get defaultTransformerOptions() {
        console.warn(`
            These options are DEPRECATED and will be removed in the next major release.
            Please use "createCjsPreset" or "createEsmPreset" function instead. See documentation at https://thymikee.github.io/jest-preset-angular/docs/getting-started/presets
        `);

        return ngJestPresets.defaultTransformerOptions;
    },
    createCjsPreset: ngJestPresets.createCjsPreset,
    createEsmPreset: ngJestPresets.createEsmPreset,
};
