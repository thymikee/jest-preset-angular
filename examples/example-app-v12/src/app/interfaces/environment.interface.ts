import { InjectionToken } from '@angular/core';

export interface IAppEnvironment {
  production: boolean;
}

export const APP_ENVIRONMENT = new InjectionToken<IAppEnvironment>('APP_ENVIRONMENT');
