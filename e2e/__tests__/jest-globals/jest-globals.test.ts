describe('Jest globals', () => {
  it.each([[1, 2]])('with 2D array', (arg1, arg2) => {
    expect(arg1).toBe(1);
    expect(arg2).toBe(2);
  });

  it.each([2])('with 1D array', (arg1) => {
    expect(arg1).toBe(2);
  });

  // eslint-disable-next-line
  (it.each([2]) as any)('it.each with 1D array and done', (arg1: any, done: () => void) => {
    expect(arg1).toBe(2);
    done();
  });

  // eslint-disable-next-line
  (it.each([[1, 2]]) as any)('it.each with done', (arg1: any, arg2: any, done: () => void) => {
    expect(arg1).toBe(1);
    expect(arg2).toBe(2);
    done();
  });

  it.each`
    foo  | bar
    ${1} | ${2}
  `('it.each should work with table as a tagged template literal', ({ foo, bar }) => {
    expect(foo).toBe(1);
    expect(bar).toBe(2);
  });

  // eslint-disable-next-line
  (it.each`foo  | bar ${1} | ${2}` as any)('it.each should work with table as a tagged template literal with done', ({ foo, bar }: any, done: () => void) => {
      expect(foo).toBe(1);
      expect(bar).toBe(2);
      done();
    },
  );

  it.each`
    foo  | bar
    ${1} | ${2}
  `('(async) it.each should work with table as a tagged template literal', async ({ foo, bar }) => {
    expect(foo).toBe(1);
    expect(bar).toBe(2);
  });

  test.todo('a sample todo');
});
