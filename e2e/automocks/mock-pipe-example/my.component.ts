import { Component, signal } from '@angular/core';
import { SomePipe } from 'external-lib';

@Component({
    selector: 'my',
    template: ` <p>{{ value() | some }}</p> `,
    imports: [SomePipe],
})
export class MyComponent {
    public readonly value = signal('');
}
