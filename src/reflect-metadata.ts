const METADATA_KEY_PARAMTYPES = 'design:paramtypes';
const CTOR_PARAMETERS_JPA = 'ctorParametersJPA';

// weird workaround to avoid 'ReferenceError: globalThis is not defined' in node version < 11
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
(global as any).globalThis = (global as any).globalThis || undefined;

const _global = globalThis || global; // globalThis available since node v12/TS v3.4
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reflect: any = _global['Reflect']; // reflect type in global has not these methods

// let's not blindly override, maybe there is already a reflect lib in use
// but just overriding one of the two functions does not serve any purpose
if (!reflect.metadata && !reflect.getOwnMetadata) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reflect.metadata = (metadataKey: any, metadataValue: any) => (target: any, key: any) => {
    if (metadataKey === METADATA_KEY_PARAMTYPES && key === undefined) {
      // key undefined is ctor
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      target[CTOR_PARAMETERS_JPA] = metadataValue;
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reflect.getOwnMetadata = (metadata: any, target: any, key: any) => {
    if (metadata === METADATA_KEY_PARAMTYPES && key === undefined) {
      // key undefined is ctor
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return target[CTOR_PARAMETERS_JPA];
    }
  };
}
