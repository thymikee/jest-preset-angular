it('should work', () => {
    expect({ ...{ bar: 'foo' }, foo: 'bar' }).toEqual({ foo: 'bar', bar: 'foo' });
});
