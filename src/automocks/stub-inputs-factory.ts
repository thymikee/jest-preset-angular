import { input } from '@angular/core';

import { InputFlags } from './types';

export function stubInputsFactory<T>(
    factory: () => T,
    inputs: Record<string, [minifiedName: string, flags: InputFlags, transform: ((value: unknown) => unknown) | null]>,
): () => T {
    return () => {
        const obj = factory();

        for (const [propertyName, flags] of Object.values(inputs)) {
            switch (flags) {
                case InputFlags.SignalBased: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (obj as any)[propertyName] = input();

                    break;
                }
                default:
                    throw new Error('Unknown input flag');
            }
        }

        return obj;
    };
}
