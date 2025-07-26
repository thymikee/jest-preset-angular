import { Component, inject } from '@angular/core';
import { SomeService } from 'external-lib';

@Component({
    selector: 'my',
    template: `<button (click)="onButtonClick()">Click me</button>`,
})
export class MyComponent {
    private readonly someService = inject(SomeService);

    public onButtonClick(): void {
        this.someService.doSomething();
    }
}
