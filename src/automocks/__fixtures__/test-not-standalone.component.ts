import { Component } from '@angular/core';

@Component({
    selector: 'test',
    template: 'this is a test',
    standalone: false,
    styles: [':host { display: block; }'],
})
export class TestComponent {
    method() {}
}
