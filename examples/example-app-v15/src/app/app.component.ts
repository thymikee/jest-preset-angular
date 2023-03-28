import { Component } from '@angular/core';
import { firstValueFrom, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  async testFunction() {
    await firstValueFrom(
      of('').pipe(
        map(() => {
          throw 'error';
        }),
      ),
    );
  }
}
