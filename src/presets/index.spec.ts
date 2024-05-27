import fs from 'fs';
import path from 'path';

import { defaultPreset, defaultEsmPreset } from './';

describe('Jest presets', () => {
    test.each([defaultPreset, defaultEsmPreset])('should return the correct jest config', (preset) => {
        expect(preset).toMatchSnapshot();
    });

    test('should have the correct types which come from `ts-jest`', () => {
        expect(fs.readFileSync(path.join(__dirname, '..', '..', 'presets/index.d.ts'), 'utf-8')).toMatchSnapshot();
    });
});
