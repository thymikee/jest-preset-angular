/* eslint-disable no-redeclare */
import stableStringify from 'fast-json-stable-stringify';

const UNDEFINED = 'undefined';

/**
 * @internal
 */
export function stringify(input: unknown): string {
  return input === undefined ? UNDEFINED : stableStringify(input);
}
