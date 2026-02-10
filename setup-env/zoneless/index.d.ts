import type { StaticProvider } from '@angular/core';
import type { TestEnvironmentOptions } from '@angular/core/testing';

export interface SetupOptions extends TestEnvironmentOptions {
    extraProviders?: StaticProvider[];
}

declare const _default: {
    setupZonelessTestEnv: (options?: SetupOptions) => void;
};
export = _default;
