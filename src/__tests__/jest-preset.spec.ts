// @ts-expect-error for now we don't ship assets with .d.ts
import defaultsESMPreset from '../../presets/defaults-esm/jest-preset';
// @ts-expect-error for now we don't ship assets with .d.ts
import defaultsPreset from '../../presets/defaults/jest-preset';

describe('Jest presets', () => {
  test.each([defaultsPreset, defaultsESMPreset])('should return the correct jest config', (preset) => {
    expect(preset).toMatchSnapshot();
  });
});
