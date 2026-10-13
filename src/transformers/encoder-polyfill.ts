/**
 * @fileoverview Polyfills `TextEncoder`/`TextDecoder` from `node:util` when they
 * are missing from the global scope.
 *
 * This is necessary because the bundled Angular compiler CLI (`jit_transform`)
 * instantiates `TextDecoder` at module scope, and some Jest test environments
 * (e.g. jsdom) do not expose these globals.
 */
import { TextDecoder, TextEncoder } from 'node:util';

if (typeof globalThis.TextEncoder === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).TextEncoder = TextEncoder;
}

if (typeof globalThis.TextDecoder === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).TextDecoder = TextDecoder;
}
