import presets from '../../presets';

describe('Presets', () => {
  test('should return the correct default preset value', () => {
    expect(presets.defaults).toMatchSnapshot('default-preset');
  });

  test('should return the correct ESM preset value', () => {
    expect(presets.defaultsESM).toMatchSnapshot('esm-preset');
  });
});
