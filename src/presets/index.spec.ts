import presets, {
    defaults as defaultPreset,
    defaultsESM as defaultEsmPreset,
    createCjsPreset,
    createEsmPreset,
    defaultTransformerOptions,
} from '../../presets';

describe('Jest presets', () => {
    test.each([defaultPreset, defaultEsmPreset])(
        'should return the correct jest config with legacy preset config',
        (preset) => {
            expect(preset).toMatchSnapshot();
        },
    );

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
            defaults: defaultPreset,
            defaultsESM: defaultEsmPreset,
            defaultTransformerOptions,
            createCjsPreset,
            createEsmPreset,
        });
    });
});
