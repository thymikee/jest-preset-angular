import { Type, ɵPipeDef, ɵɵdefinePipe } from '@angular/core';

import { StubCache } from './stub-cache';
import { PipeType } from './types';

export function stubPipe<T>(cache: StubCache, actual: Type<T>, mock: Type<T>): asserts mock is PipeType<T> {
    const { name, pure, standalone } = (actual as PipeType<T>).ɵpipe;

    cache.setMock(actual, mock);

    Object.defineProperty(mock, 'ɵpipe', {
        get: () =>
            cache.getOrCreatePipeDef(
                actual,
                () =>
                    ɵɵdefinePipe({
                        name,
                        type: mock,
                        pure,
                        standalone,
                    }) as ɵPipeDef<T>,
            ),
    });

    Object.defineProperty(mock, 'ɵfac', {
        value: () => new mock(),
    });
}
