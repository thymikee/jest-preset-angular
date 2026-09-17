import { test, jest, jest as aliasedJest } from '@jest/globals';
import * as JestGlobals from '@jest/globals';

import a from '../src/a';
import b from '../src/b';
import c from '../src/c';

// These will be hoisted above imports
jest.unmock('../src/a');
aliasedJest.unmock('../src/b');
JestGlobals.jest.unmock('../src/c');

// tests

test('named import', () => {
    // @ts-expect-error property added by Jest
    expect(a._isMockFunction).toBeUndefined();
    expect(a()).toBe('unmocked');
});

test('aliased named import', () => {
    // @ts-expect-error property added by Jest
    expect(b._isMockFunction).toBeUndefined();
    expect(b()).toBe('unmocked');
});

test('namespace import', () => {
    // @ts-expect-error property added by Jest
    expect(c._isMockFunction).toBeUndefined();
    expect(c()).toBe('unmocked');
});
