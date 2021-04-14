import presets from '../../presets';

describe('Jest presets', () => {
  test.each([presets.defaults, presets.defaultsESM])('should return the correct jest config', (preset) => {
    expect(preset).toMatchSnapshot();
  });
});
