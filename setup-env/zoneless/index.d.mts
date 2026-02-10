import type { StaticProvider } from '@angular/core';
import type { TestEnvironmentOptions } from '@angular/core/testing';

export interface SetupOptions extends TestEnvironmentOptions {
    extraProviders?: StaticProvider[];
}

export declare const setupZonelessTestEnv: (options?: SetupOptions) => void;
