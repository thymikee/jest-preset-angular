import { Directive } from '@angular/core';

@Directive({
    selector: '[test]',
    standalone: false,
})
export class TestDirective {
    method() {}
}
