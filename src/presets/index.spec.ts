import fs from 'fs';
import path from 'path';

import { defaultPreset, defaultEsmPreset } from './';

describe('Jest presets', () => {
  test.each([defaultPreset, defaultEsmPreset])('should return the correct jest config', (preset) => {
    expect(preset).toMatchSnapshot();
  });

  test.each([
    path.join(__dirname, '..', '..', 'presets/defaults/jest-preset.d.ts'),
    path.join(__dirname, '..', '..', 'presets/defaults-esm/jest-preset.d.ts'),
  ])('should have the correct types which come from `ts-jest`', (presetTypes) => {
    expect(fs.readFileSync(presetTypes, 'utf-8')).toMatchSnapshot();
  });
});
