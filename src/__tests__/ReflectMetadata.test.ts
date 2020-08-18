import '../reflect-metadata';

describe('using minimal reflect metadata', () => {

  // to avoid type conflicts with global.Reflect comfortably
  let reflect: any = Reflect;

  it(`should make metadata() and getOwnMetadata() available on global.Reflect`, () => {
    expect(typeof reflect.metadata).toBe('function')
    expect(typeof reflect.getOwnMetadata).toBe('function')
  });

  it('should set and retrieve metadata using Reflect.metadata and Reflect.getOwnMetadata', () => {
    const metadataValue = () => ({ test: 'object'});
    const functionClass = function FunctionClass() {};

    reflect.metadata('design:paramtypes', metadataValue)(functionClass);
    const retrieved = reflect.getOwnMetadata('design:paramtypes', functionClass);
    expect(retrieved).toBe(metadataValue);
    expect(retrieved().test).toBe('object');
  });
});
