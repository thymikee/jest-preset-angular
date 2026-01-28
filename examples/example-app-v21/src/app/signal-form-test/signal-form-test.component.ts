import { Component, signal } from '@angular/core';
import { form } from '@angular/forms/signals';

type MyFormModel = {
    myProperty: string;
};

@Component({
    selector: 'app-signal-form-test',
    standalone: true,
    template: `
        <div>
            <h2>Signal Form Test Component</h2>
            <p>This component tests Signal Forms with snapshot testing</p>
        </div>
    `,
})
export class SignalFormTestComponent {
    private readonly myFormModel = signal<MyFormModel>({
        myProperty: '',
    });

    // Use the actual Signal Forms API from Angular
    protected readonly myForm = form(this.myFormModel);
}
