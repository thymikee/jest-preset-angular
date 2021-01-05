import { forwardRef, Inject } from '@angular/core';

export class Door {
  lock: Lock;

  // Door attempts to inject Lock, despite it not being defined yet.
  // forwardRef makes this possible.
  constructor(@Inject(forwardRef(() => Lock)) lock: Lock) {
    this.lock = lock;
  }
}

// Only at this point Lock is defined.
export class Lock {}
