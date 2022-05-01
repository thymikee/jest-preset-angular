import { Component } from '@angular/core';

import { Services } from '../app-services';

@Component({
  template: ` <h1>Foo</h1> `,
})
export class FooComponent {
  constructor(private appService: Services.AppService) {}
}
