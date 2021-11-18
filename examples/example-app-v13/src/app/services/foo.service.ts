import { Inject, Injectable } from '@angular/core';

import { APP_ENVIRONMENT, AppEnvironment } from '../configs/environment.config';

@Injectable({
  providedIn: 'root',
})
export class FooService {
  constructor(@Inject(APP_ENVIRONMENT) private readonly env: AppEnvironment) {}

  getFoo(): string {
    return this.env.production ? 'foo' : 'bar';
  }
}
