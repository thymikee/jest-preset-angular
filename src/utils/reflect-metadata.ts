// eslint-disable-next-line @typescript-eslint/no-namespace, @typescript-eslint/no-unused-vars
declare namespace Reflect {
  // here we extend the global Reflect definition by these two functions used in Angular
  function metadata(
    metadataKey: string,
    metadataValue: unknown,
  ): (target: Record<string, unknown>, key: string | undefined) => void;
  function getOwnMetadata(metadata: unknown, target: Record<string, unknown>, key: string | undefined): unknown;
}

const METADATA_KEY_PARAMTYPES = 'design:paramtypes';

// weird workaround to avoid 'ReferenceError: globalThis is not defined' in node version < 11
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).globalThis = global.globalThis || undefined;

const globalRef = globalThis || global; // globalThis available since node v12/TS v3.4
const reflect = globalRef['Reflect']; // reflect type in global has not these methods

const metadataValueStore = new WeakMap<Record<string, unknown>, unknown>();

// let's not blindly override, maybe there is already a reflect lib in use
// but just overriding one of the two functions does not serve any purpose
if (!reflect.metadata && !reflect.getOwnMetadata) {
  reflect.metadata = (metadataKey: string, metadataValue: unknown) => (
    target: Record<string, unknown>,
    key: string | undefined,
  ) => {
    if (metadataKey === METADATA_KEY_PARAMTYPES && key === undefined) {
      // key undefined is ctor
      metadataValueStore.set(target, metadataValue);
    }
  };
  reflect.getOwnMetadata = (metadata: unknown, target: Record<string, unknown>, key: string | undefined) => {
    if (metadata === METADATA_KEY_PARAMTYPES && key === undefined && metadataValueStore.has(target)) {
      // key undefined is ctor
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return metadataValueStore.get(target);
    }
  };
}
