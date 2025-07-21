import presets, { createCjsPreset, createEsmPreset } from '../../presets';

describe('Jest presets', () => {
    it('should return jest config with preset creator functions', () => {
        expect(createCjsPreset()).toMatchSnapshot('for createCjsPreset');
        expect(createEsmPreset()).toMatchSnapshot('for createEsmPreset');
    });

    it('should return jest config with preset creator functions with options', () => {
        expect(
            createCjsPreset({
                diagnostics: false,
            }),
        ).toMatchSnapshot('for createCjsPreset');
        expect(
            createEsmPreset({
                diagnostics: false,
            }),
        ).toMatchSnapshot('for createEsmPreset');
    });

    it('should allow default export', () => {
        expect(presets).toEqual({
            createCjsPreset,
            createEsmPreset,
        });
    });

    it('should allow to customize testEnvironment with preset creator functions', () => {
        expect(
            createCjsPreset({
                testEnvironment: 'jest-preset-angular/environments/jest-jsdom-env',
            }),
        ).toEqual(
            expect.objectContaining({
                testEnvironment: 'jest-preset-angular/environments/jest-jsdom-env',
            }),
        );
        expect(
            createEsmPreset({
                testEnvironment: 'jest-preset-angular/environments/jest-jsdom-env',
            }),
        ).toEqual(
            expect.objectContaining({
                testEnvironment: 'jest-preset-angular/environments/jest-jsdom-env',
            }),
        );
    });
});
