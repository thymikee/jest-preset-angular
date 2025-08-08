import { TextDecoder, TextEncoder } from 'util';

export const polyfillEncoder = () => {
    if (typeof globalThis.TextEncoder === 'undefined') {
        globalThis.TextEncoder = TextEncoder;
        globalThis.TextDecoder = TextDecoder;
    }
};

export const resolveTestEnvOptions = (options) => {
    const globalTestEnvOptions = globalThis.ngJest?.testEnvironmentOptions;
    if (globalTestEnvOptions) {
        console.warn(
            'Setting testEnvironmentOptions via globalThis.ngJest is deprecated. Please provide testEnvironmentOptions via function argument',
        );
    }

    return globalTestEnvOptions ?? options;
};