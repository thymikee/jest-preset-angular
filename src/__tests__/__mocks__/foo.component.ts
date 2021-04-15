import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<h1>Foo Bar</h1>`,
  styleUrls: ['./app.component.scss', './foo.component.css'],
  styles: [
    `
      h1 {
        font-size: 1.6rem;
      }
    `,
  ],
})
export class FooComponent {
  title = 'test-app-v10';
}
