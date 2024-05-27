import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { sharedImports } from '@shared/shared';
import { Observable, of } from 'rxjs';
import { catchError, startWith } from 'rxjs/operators';

import { TwainService } from './twain.service';

@Component({
    standalone: true,
    selector: 'twain-quote',
    template: ` <p class="twain">
            <i>{{ quote | async }}</i>
        </p>
        <button
            type="button"
            (click)="getQuote()"
        >
            Next quote
        </button>
        <p
            class="error"
            *ngIf="errorMessage"
        >
            {{ errorMessage }}
        </p>`,
    styles: ['.twain { font-style: italic; } .error { color: red; }'],
    imports: [AsyncPipe, sharedImports],
})
export class TwainComponent implements OnInit {
    errorMessage!: string;
    quote!: Observable<string>;

    constructor(private readonly twainService: TwainService) {}

    ngOnInit(): void {
        this.getQuote();
    }

    getQuote() {
        this.errorMessage = '';
        this.quote = this.twainService.getQuote().pipe(
            startWith('...'),
            catchError((err: Error) => {
                setTimeout(() => (this.errorMessage = err.message || err.toString()));

                return of('...');
            }),
        );
    }
}
