import { Component, inject } from '@angular/core';

import { Services } from '@shared/shared';

@Component({
  template: ` <h1>Foo</h1> `,
  standalone: true,
})
export class FooComponent {
  private appService = inject(Services.AppService);
}
