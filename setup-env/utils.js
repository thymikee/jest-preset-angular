const { TextDecoder, TextEncoder } = require('util');

const polyfillEncoder = () => {
    if (typeof globalThis.TextEncoder === 'undefined') {
        globalThis.TextEncoder = TextEncoder;
        globalThis.TextDecoder = TextDecoder;
    }
};

const resolveTestEnvOptions = (options) => {
    const globalTestEnvOptions = globalThis.ngJest?.testEnvironmentOptions;
    if (globalTestEnvOptions) {
        console.warn(
            'Setting testEnvironmentOptions via globalThis.ngJest is deprecated. Please provide testEnvironmentOptions via function argument',
        );
    }

    return globalTestEnvOptions ?? options;
};

module.exports = {
    polyfillEncoder,
    resolveTestEnvOptions,
};
