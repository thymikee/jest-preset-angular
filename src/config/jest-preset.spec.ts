import fs from 'fs';
import path from 'path';

import presets from '../../presets';

describe('Jest presets', () => {
  test.each([presets.defaults, presets.defaultsESM])('should return the correct jest config', (preset) => {
    expect(preset).toMatchSnapshot();
  });

  // If there is a better way to test typings, PR is welcome!!
  test('should have the correct types which come from `ts-jest`', () => {
    expect(fs.readFileSync(path.join(__dirname, '..', '..', 'presets', 'index.d.ts'), 'utf-8')).toMatchInlineSnapshot(`
      "import type { InitialOptionsTsJest } from 'ts-jest/dist/types';

      declare const _default: {
        defaults: InitialOptionsTsJest;
        defaultsESM: InitialOptionsTsJest;
      };
      export = _default;
      "
    `);
  });
});
