import { Component } from '@angular/core';

import { TestDirective } from './test-with-signal-inputs.directive';

@Component({
    selector: 'test',
    template: 'this is a test',
    standalone: true,
    styles: [':host { display: block; }'],
    hostDirectives: [
        {
            directive: TestDirective,
            inputs: ['value1', 'value2', 'aValue3', 'aValue4'],
        },
    ],
})
export class TestComponent {
    method() {}
}
