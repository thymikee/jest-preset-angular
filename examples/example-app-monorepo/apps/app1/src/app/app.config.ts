import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { UserService } from 'libs/user/src/lib/user.service';

import { routes } from './app.routes';
import { InMemoryDataService } from './in-memory-data.service';
import { HeroService } from './model';
import { TwainService } from './twain/twain.service';

export const appProviders = [
  provideRouter(routes),
  provideHttpClient(),
  provideProtractorTestingSupport(),
  importProvidersFrom(HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false })),
  HeroService,
  TwainService,
  UserService,
];

export const appConfig = {
  providers: appProviders,
};
