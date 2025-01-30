import { StubCache } from './stub-cache';
import { stubComponent } from './stub-component';
import { stubDirective } from './stub-directive';
import { stubInjectable } from './stub-injectable';
import { stubModule } from './stub-module';
import { stubPipe } from './stub-pipe';

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
}

function isFunction(value: unknown): value is (...args: unknown[]) => unknown {
    return typeof value === 'function';
}

function isFunctionOrRecord(value: unknown): value is ((...args: unknown[]) => unknown) | Record<string, unknown> {
    return isFunction(value) || isRecord(value);
}

function isConstructor(value: unknown): value is new (...args: unknown[]) => unknown {
    return (
        typeof value === 'function' &&
        typeof value.prototype === 'object' &&
        value.prototype !== null &&
        value.prototype.constructor === value
    );
}

function* walk<T>(
    actual: T,
    mock: T,
    walkedNodes: unknown[] = [],
): Generator<[actual: new (...args: unknown[]) => unknown, mock: new (...args: unknown[]) => unknown]> {
    if (!isFunctionOrRecord(actual) || !isFunctionOrRecord(mock) || walkedNodes.includes(actual)) {
        return;
    }

    const keys = Object.getOwnPropertyNames(actual) as (string & keyof T)[];

    if (isConstructor(actual) && isConstructor(mock) && keys.some((key) => key.startsWith('ɵ'))) {
        yield [actual, mock];

        return;
    }

    for (const key of Object.getOwnPropertyNames(actual) as (string & keyof T)[]) {
        if (!Reflect.has(actual, key)) {
            continue;
        }

        try {
            yield* walk(Reflect.get(actual, key), Reflect.get(mock, key), [...walkedNodes, actual]);
        } catch {
            // pass
        }
    }
}

export function stubAnything<T>(cache: StubCache, actual: T, mock: T): void {
    for (const [actualCtor, mockCtor] of walk(actual, mock)) {
        if ('ɵprov' in actualCtor) {
            stubInjectable(cache, actualCtor, mockCtor);
        }

        if ('ɵcmp' in actualCtor) {
            stubComponent(cache, actualCtor, mockCtor);
        }

        if ('ɵdir' in actualCtor) {
            stubDirective(cache, actualCtor, mockCtor);
        }

        if ('ɵpipe' in actualCtor) {
            stubPipe(cache, actualCtor, mockCtor);
        }

        if ('ɵmod' in actualCtor) {
            stubModule(cache, actualCtor, mockCtor);
        }
    }
}
