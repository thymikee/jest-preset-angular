import fs from 'fs';
import path from 'path';

import presets from '../../presets';

describe('Jest presets', () => {
  test.each([presets.defaults, presets.defaultsESM])('should return the correct jest config', (preset) => {
    expect(preset).toMatchSnapshot();
  });

  test('should have the correct types which come from `ts-jest`', () => {
    expect(fs.readFileSync(path.join(__dirname, '..', '..', 'presets', 'index.d.ts'), 'utf-8')).toMatchSnapshot();
  });
});
