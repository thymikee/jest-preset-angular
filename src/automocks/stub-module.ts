import { Type, ɵNgModuleDef, ɵɵdefineNgModule } from '@angular/core';

import { stubAnything } from './stub-anything';
import type { StubCache } from './stub-cache';
import { stubConstructor } from './stub-constructor';
import { ModuleType } from './types';

function assertNotFunction<T>(value: T): asserts value is Exclude<T, (...args: unknown[]) => unknown> {
    if (typeof value === 'function') {
        throw new Error('Not implemented');
    }
}

function stubArray<T extends Type<unknown>>(cache: StubCache, actual: T[]): T[] {
    return actual.map((itemActual) =>
        cache.getMock(itemActual, () => stubConstructor(cache, itemActual, stubAnything)),
    ) as T[];
}

export function stubModule<T>(cache: StubCache, actual: Type<T>, mock: Type<T>): asserts mock is ModuleType<T> {
    const {
        imports: importsActual,
        exports: exportsActual,
        declarations: declarationsActual,
    } = (actual as ModuleType<T>).ɵmod;

    assertNotFunction(importsActual);
    assertNotFunction(exportsActual);
    assertNotFunction(declarationsActual);

    cache.setMock(actual, mock);

    Object.defineProperty(mock, 'ɵmod', {
        get: () =>
            cache.getOrCreateModuleDef(
                actual,
                () =>
                    ɵɵdefineNgModule({
                        type: mock,
                        imports: stubArray(cache, importsActual),
                        declarations: stubArray(cache, declarationsActual),
                        exports: stubArray(cache, exportsActual),
                    }) as ɵNgModuleDef<T>,
            ),
    });

    Object.defineProperty(mock, 'ɵfac', {
        value: () => new mock(),
    });
}
