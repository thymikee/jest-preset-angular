import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FooService {
  getFoo(): string {
    return 'foo';
  }
}
