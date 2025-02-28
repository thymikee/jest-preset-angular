import fs from 'node:fs';
import path from 'node:path';

import { createCjsPreset, createEsmPreset } from './';

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

    it('should have the correct types which come from `ts-jest`', () => {
        expect(fs.readFileSync(path.join(__dirname, '..', '..', 'presets/index.d.ts'), 'utf-8')).toMatchSnapshot();
    });
});
