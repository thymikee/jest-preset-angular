import { Component, Inject, inject, InjectionToken } from '@angular/core';
import { Services } from '@shared/shared';

export interface ServerError {
    title: string;
    errors: Map<string, string[]>;
}

export const FOO_COMPONENT_DATA_TOKEN = new InjectionToken<ServerError>('FooComponentData');

@Component({
    template: ` <h1>Foo</h1> `,
    standalone: true,
})
export class FooComponent {
    private readonly appService = inject(Services.AppService);

    constructor(@Inject(FOO_COMPONENT_DATA_TOKEN) public data: ServerError) {}
}
