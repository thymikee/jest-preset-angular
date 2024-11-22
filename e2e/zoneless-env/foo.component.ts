import { NgIf } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
    selector: 'foo',
    standalone: true,
    templateUrl: './foo.component.html',
    styleUrls: ['./foo.component.scss'],
    // we have to setup styles this way, since simple styles/styleUrs properties will be removed (jest does not unit test styles)
    styles: [
        `
            p {
                color: red;
            }
        `,
    ],
    imports: [NgIf],
})
export class FooComponent {
    readonly value1 = input('val1');
    readonly value2 = input('val2');

    protected readonly condition1 = true;
    protected readonly condition2 = false;
}
