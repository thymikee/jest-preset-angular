import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, startWith } from 'rxjs/operators';

import { TwainService } from './twain.service';

@Component({
  selector: 'twain-quote',
  template: ` <p class="twain">
      <i>{{ quote | async }}</i>
    </p>
    <button (click)="getQuote()">Next quote</button>
    <p class="error" *ngIf="errorMessage">{{ errorMessage }}</p>`,
  styles: [
    `
      .twain {
        font-style: italic;
      }
      .error {
        color: red;
      }
    `,
  ],
})
export class TwainComponent implements OnInit {
  errorMessage!: string;
  quote!: Observable<string>;

  constructor(private twainService: TwainService) {}

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
