import type { StaticProvider } from '@angular/core';
import type { TestEnvironmentOptions } from '@angular/core/testing';

interface SetupOptions extends TestEnvironmentOptions {
    extraProviders?: StaticProvider[];
}

export declare const setupZoneTestEnv: (options?: SetupOptions) => void;
