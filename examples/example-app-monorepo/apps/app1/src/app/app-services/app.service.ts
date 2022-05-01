import { Inject, Injectable, Optional } from '@angular/core';
import type { Request } from 'express';

import { REQUEST } from './app.tokens';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(@Inject(REQUEST) @Optional() private request: Request) {}
}
