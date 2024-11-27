import fs from 'fs';
import path from 'path';

import { defaultPreset, defaultEsmPreset, createCjsPreset, createEsmPreset } from './';

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

    test('should have the correct types which come from `ts-jest`', () => {
        expect(fs.readFileSync(path.join(__dirname, '..', '..', 'presets/index.d.ts'), 'utf-8')).toMatchSnapshot();
    });
});
