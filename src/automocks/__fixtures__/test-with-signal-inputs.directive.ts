import { Directive, input } from '@angular/core';

@Directive({
    selector: '[test]',
    standalone: true,
})
export class TestDirective {
    public readonly value1 = input('');
    public readonly value2 = input.required<string>();
    public readonly value3 = input('', {
        alias: 'aValue3',
    });
    public readonly value4 = input.required({
        alias: 'aValue4',
    });

    method() {}
}
