import { Component, input, output } from '@angular/core';

@Component({
    selector: 'some',
    template: ``,
})
export class SomeComponent {
    public readonly value = input.required<string>();

    public readonly helloWorld = output();
}
