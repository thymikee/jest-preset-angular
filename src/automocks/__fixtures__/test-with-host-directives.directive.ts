import { Directive } from '@angular/core';

import { TestDirective as TestDirectiveSimple } from './test.directive';

@Directive({
    selector: '[test]',
    standalone: true,
    hostDirectives: [TestDirectiveSimple],
})
export class TestDirective {
    method() {}
}
