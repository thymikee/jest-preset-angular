import { Component, signal } from '@angular/core';

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

    // Mimic the behavior of Signal Forms which creates a Proxy(Function)
    protected readonly myForm = new Proxy(() => {}, {
        get(target, prop) {
            if (prop === 'constructor') {
                return { name: 'FormProxy' };
            }

            return Reflect.get(target, prop);
        },
    });
}
