import { Type, ɵɵdefineDirective } from '@angular/core';

import type { StubCache } from './stub-cache';
import { stubHostDirectives } from './stub-host-directives';
import { stubInputsFactory } from './stub-inputs-factory';
import { DirectiveType } from './types';

export function stubDirective<T>(cache: StubCache, actual: Type<T>, mock: Type<T>): asserts mock is DirectiveType<T> {
    const { selectors, exportAs, standalone, signals, hostDirectives, inputs, inputConfig } = (
        actual as DirectiveType<T>
    ).ɵdir;

    cache.setMock(actual, mock);

    Object.defineProperty(mock, 'ɵdir', {
        get: () =>
            cache.getOrCreateDirectiveDef(actual, () => {
                const features: never[] = [];

                stubHostDirectives(cache, hostDirectives, features);

                return ɵɵdefineDirective({
                    type: mock,
                    selectors,
                    inputs: inputConfig,
                    outputs: {},
                    exportAs: exportAs ?? undefined,
                    standalone,
                    signals,
                    features,
                });
            }),
    });

    let factory = () => new mock();

    factory = stubInputsFactory(factory, inputs);

    Object.defineProperty(mock, 'ɵfac', {
        value: factory,
    });
}
