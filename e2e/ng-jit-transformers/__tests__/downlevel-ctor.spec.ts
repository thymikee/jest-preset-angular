import { forwardRef, Inject, Injector } from '@angular/core';

test('forwardRef should work', () => {
    class Door {
        lock: Lock;

        // Door attempts to inject Lock, despite it not being defined yet.
        // forwardRef makes this possible.
        constructor(@Inject(forwardRef(() => Lock)) lock: Lock) {
            this.lock = lock;
        }
    }

    // Only at this point Lock is defined.
    class Lock {}

    const injector = Injector.create({
        providers: [
            { provide: Lock, deps: [] },
            { provide: Door, deps: [Lock] },
        ],
    });

    expect(injector.get(Door)).toBeInstanceOf(Door);
    expect(injector.get(Door).lock).toBeInstanceOf(Lock);
});
