import { Type } from '@angular/core';

import { StubCache } from './stub-cache';

export function stubConstructor<T>(
    cache: StubCache,
    actual: Type<T>,
    stubFn: (cache: StubCache, actual: Type<T>, mock: Type<T>) => void,
): Type<T> {
    const mock = jest.fn() as Type<T>;

    for (const key of Object.getOwnPropertyNames(actual.prototype)) {
        if (key !== 'constructor' && typeof actual.prototype[key] === 'function') {
            mock.prototype[key] = jest.fn();
        }
    }

    stubFn(cache, actual, mock);

    return mock;
}
