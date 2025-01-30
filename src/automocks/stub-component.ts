import { Type, ɵComponentDef, ɵɵdefineComponent } from '@angular/core';

import type { StubCache } from './stub-cache';
import { stubHostDirectives } from './stub-host-directives';
import { stubInputsFactory } from './stub-inputs-factory';
import { ComponentType } from './types';

export function stubComponent<T>(cache: StubCache, actual: Type<T>, mock: Type<T>): asserts mock is ComponentType<T> {
    const { selectors, exportAs, standalone, signals, ngContentSelectors, hostDirectives, inputs, inputConfig } = (
        actual as ComponentType<T>
    ).ɵcmp;

    cache.setMock(actual, mock);

    Object.defineProperty(mock, 'ɵcmp', {
        get(): ɵComponentDef<T> {
            return cache.getOrCreateComponentDef(actual, () => {
                const features: never[] = [];

                stubHostDirectives(cache, hostDirectives, features);

                return ɵɵdefineComponent({
                    type: mock,
                    selectors,
                    inputs: inputConfig,
                    outputs: {},
                    exportAs: exportAs ?? undefined,
                    standalone,
                    signals,
                    decls: 0,
                    vars: 0,
                    template: () => {},
                    ngContentSelectors,
                    hostAttrs: ['stub-component', Math.random()],
                    features,
                });
            });
        },
    });

    let factory = () => new mock();

    factory = stubInputsFactory(factory, inputs);

    Object.defineProperty(mock, 'ɵfac', {
        value: factory,
    });
}
