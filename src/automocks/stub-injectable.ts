import { Type, ɵɵdefineInjectable } from '@angular/core';

import { StubCache } from './stub-cache';
import { InjectableType } from './types';

export function stubInjectable<T>(cache: StubCache, actual: Type<T>, mock: Type<T>): asserts mock is InjectableType<T> {
    const { providedIn } = (actual as InjectableType<T>).ɵprov;

    cache.setMock(actual, mock);

    Object.defineProperty(mock, 'ɵprov', {
        get: () =>
            ɵɵdefineInjectable({
                token: mock,
                providedIn,
                factory: () => new mock(),
            }),
    });

    Object.defineProperty(mock, 'ɵfac', {
        value: () => new mock(),
    });
}
