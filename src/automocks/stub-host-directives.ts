import { Type, ɵComponentDef, ɵDirectiveDef, ɵɵHostDirectivesFeature } from '@angular/core';
import { jest } from '@jest/globals';

import { StubCache } from './stub-cache';
import { stubDirective } from './stub-directive';

export function stubHostDirectives<T>(
    cache: StubCache,
    hostDirectives: (ɵDirectiveDef<T> | ɵComponentDef<T>)['hostDirectives'],
    features: unknown[],
): void {
    if (hostDirectives) {
        features.push(
            ɵɵHostDirectivesFeature(
                hostDirectives.map((hostDirective) => {
                    if (typeof hostDirective === 'object') {
                        return {
                            directive: cache.getMock(hostDirective.directive, () => {
                                const mock = jest.fn(() => ({})) as unknown as Type<T>;

                                stubDirective(new StubCache(), hostDirective.directive, mock);

                                return mock;
                            }),
                            inputs: Object.entries(hostDirective.inputs).flat(),
                            outputs: [],
                        };
                    } else {
                        throw new Error('Unknown case');
                    }
                }),
            ),
        );
    }
}
