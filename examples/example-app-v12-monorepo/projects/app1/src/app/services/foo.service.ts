import { Inject, Injectable } from '@angular/core';

import { APP_ENVIRONMENT, IAppEnvironment } from '../interfaces/environment.interface';

@Injectable({
  providedIn: 'root',
})
export class FooService {
  constructor(@Inject(APP_ENVIRONMENT) private readonly env: IAppEnvironment) {}

  getFoo(): string {
    return this.env.production ? 'foo' : 'bar';
  }
}
