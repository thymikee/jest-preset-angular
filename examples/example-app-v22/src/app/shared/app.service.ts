import { Injectable, inject } from '@angular/core';

import { REQUEST } from './app.tokens';

@Injectable({
    providedIn: 'root',
})
export class AppService {
    private readonly request = inject(REQUEST);
}
