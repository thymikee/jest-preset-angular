/**
 * Copy from `ts-jest`
 * TODO: Ask `ts-jest` to expose it
 */
import stableStringify from 'fast-json-stable-stringify';

const UNDEFINED = 'undefined';

/**
 * @internal
 */
export function stringify<T = Record<string, unknown>>(input: T | undefined): string {
  return input === undefined ? UNDEFINED : stableStringify(input);
}

/**
 * @internal
 */
export function parse<T = Record<string, unknown>>(input: string): undefined | T {
  return input === UNDEFINED ? undefined : (JSON.parse(input) as T);
}
