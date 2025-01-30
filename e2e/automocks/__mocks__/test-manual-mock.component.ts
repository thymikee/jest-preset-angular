import { Component, input } from '@angular/core';

@Component({
    selector: 'test',
    template: 'this is a manual mock for test',
    standalone: true,
    styles: [':host { display: block; }'],
})
export class TestComponent {
    public value = input.required<string>();

    method() {}
}
