import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './foo.component.css'],
  styles: [
    `
      h1 {
        font-size: 1.6rem;
      }
    `,
  ],
})
export class AppComponent {
  title = 'test-app-v10';
}
