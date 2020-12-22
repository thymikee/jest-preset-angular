describe('Done callback', () => {
  test('test with done should work', (done): void => {
    let flag = false;
    setTimeout(() => {
      flag = true;
      expect(flag).toBe(true);
      done();
    }, 100);
  });
})
