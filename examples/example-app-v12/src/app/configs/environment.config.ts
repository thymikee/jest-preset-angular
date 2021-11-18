import { InjectionToken } from '@angular/core';

/**
 * @note Using TypeScript interface instead of class breaks jest esm tests with isolated modules on.
 */
export class AppEnvironment {
  constructor(input?: Partial<AppEnvironment>) {
    if (typeof input !== 'undefined') {
      const keys = Object.keys(input);
      for (const key of keys) {
        const k = <keyof AppEnvironment>key;
        this[k] = input[k] ?? false;
      }
    }
  }

  public production = false;
}

export const APP_ENVIRONMENT = new InjectionToken<AppEnvironment>('APP_ENVIRONMENT');
