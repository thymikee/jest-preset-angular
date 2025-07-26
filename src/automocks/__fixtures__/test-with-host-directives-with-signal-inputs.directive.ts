import { Directive } from '@angular/core';

import { TestDirective as TestDirectiveSimple } from './test-with-signal-inputs.directive';

@Directive({
    selector: '[test]',
    standalone: true,
    hostDirectives: [
        {
            directive: TestDirectiveSimple,
            inputs: ['value1', 'value2', 'aValue3', 'aValue4'],
        },
    ],
})
export class TestDirective {
    method() {}
}
