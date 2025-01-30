import { Component } from '@angular/core';

import { TestDirective } from './test.directive';

@Component({
    selector: 'test',
    template: 'this is a test',
    standalone: true,
    styles: [':host { display: block; }'],
    hostDirectives: [TestDirective],
})
export class TestComponent {
    method() {}
}
