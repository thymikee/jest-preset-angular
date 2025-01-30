import { Directive, input } from '@angular/core';

@Directive({
    selector: '[test]',
    standalone: true,
})
export class TestDirective {
    public value = input.required<string>();

    method() {}
}
