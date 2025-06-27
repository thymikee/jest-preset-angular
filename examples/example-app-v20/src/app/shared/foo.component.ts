import { Component, inject, InjectionToken } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Services } from '@shared/shared';
import { of } from 'rxjs';

export interface ServerError {
    title: string;
    errors: Map<string, string[]>;
}

export const FOO_COMPONENT_DATA_TOKEN = new InjectionToken<ServerError>('FooComponentData');

@Component({
    template: `<h1>Foo {{ fooText() }}</h1>`,
    standalone: true,
})
export class FooComponent {
    data = inject<ServerError>(FOO_COMPONENT_DATA_TOKEN);

    private readonly appService = inject(Services.AppService);
    protected readonly fooText = toSignal(of('world'));

    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);

    constructor() {}
}
