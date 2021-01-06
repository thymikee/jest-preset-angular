describe('Done callback', () => {
  // eslint-disable-next-line
  test('with done should work', (done): void => {
    let flag = false;
    setTimeout(() => {
      flag = true;
      expect(flag).toBe(true);
      done();
    }, 100);
  });
});
