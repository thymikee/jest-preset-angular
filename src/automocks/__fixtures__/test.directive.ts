import { Directive } from '@angular/core';

@Directive({
    selector: '[test]',
    standalone: true,
})
export class TestDirective {
    method() {}
}
