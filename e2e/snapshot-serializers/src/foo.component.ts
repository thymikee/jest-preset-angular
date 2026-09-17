import { NgIf } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { form } from '@angular/forms/signals';

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
    readonly #myFormModel = signal({
        myProperty: '',
    });
    protected readonly myForm = form(this.#myFormModel);

    protected readonly condition1 = true;
    protected readonly condition2 = false;
}
