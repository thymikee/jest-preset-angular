import { Component, input, signal } from '@angular/core';
import { SomeComponent } from 'external-lib';

@Component({
    selector: 'my',
    template: `
        @if (isVisible()) {
        <some [value]="value()" (helloWorld)="onHelloWorld($event)" />
        }
    `,
    imports: [SomeComponent],
})
export class MyComponent {
    public readonly isVisible = input(false);
    public readonly value = signal('');

    public onHelloWorld(data: string): void {
        console.log(data);
    }
}
