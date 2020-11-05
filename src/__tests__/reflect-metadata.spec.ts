import '../utils/reflect-metadata';

describe('using minimal reflect metadata', () => {
  // to avoid type conflicts with global.Reflect comfortably
  const reflect: any = Reflect; // eslint-disable-line @typescript-eslint/no-explicit-any

  it(`should make metadata() and getOwnMetadata() available on global.Reflect`, () => {
    expect(typeof reflect.metadata).toBe('function');
    expect(typeof reflect.getOwnMetadata).toBe('function');
  });

  it('should set and retrieve metadata using Reflect.metadata and Reflect.getOwnMetadata', () => {
    const metadataValue = () => ({ test: 'object' });
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const functionClass = function FunctionClass() {};

    reflect.metadata('design:paramtypes', metadataValue)(functionClass);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const retrieved = reflect.getOwnMetadata('design:paramtypes', functionClass);
    expect(retrieved).toBe(metadataValue);
    expect(retrieved().test).toBe('object');
  });
});
