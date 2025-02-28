import presets, { createCjsPreset, createEsmPreset } from '../../presets';

describe('Jest presets', () => {
    it('should return jest config with CJS preset creator function without options', () => {
        expect(createCjsPreset()).toMatchSnapshot();
    });

    it('should return jest config with CJS preset creator function with options', () => {
        expect(
            createCjsPreset({
                diagnostics: false,
            }),
        ).toMatchSnapshot();
    });

    it('should return jest config with ESM preset creator function without options', () => {
        expect(createEsmPreset()).toMatchSnapshot();
    });

    it('should return jest config with ESM preset creator function with options', () => {
        expect(
            createEsmPreset({
                diagnostics: false,
            }),
        ).toMatchSnapshot();
    });

    it('should allow default export', () => {
        expect(presets).toEqual({
            createCjsPreset,
            createEsmPreset,
        });
    });
});
