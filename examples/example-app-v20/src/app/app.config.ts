import { provideHttpClient } from '@angular/common/http';
import {
    ApplicationConfig,
    importProvidersFrom,
    provideBrowserGlobalErrorListeners,
    provideZoneChangeDetection,
} from '@angular/core';
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { routes } from './app.routes';
import { InMemoryDataService } from './in-memory-data.service';
import { HeroService, UserService } from './model';
import { TwainService } from './twain/twain.service';

export const appProviders = [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideProtractorTestingSupport(),
    importProvidersFrom(HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false })),
    HeroService,
    TwainService,
    UserService,
];

export const appConfig: ApplicationConfig = {
    providers: appProviders,
};
