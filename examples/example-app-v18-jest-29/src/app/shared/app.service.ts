import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

import { REQUEST } from './app.tokens';

@Injectable({
    providedIn: 'root',
})
export class AppService {
    private readonly request = inject(REQUEST);

    get fooText() {
        return toSignal(of('world'));
    }
}
