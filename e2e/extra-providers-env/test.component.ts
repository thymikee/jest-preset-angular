import { Component, inject } from '@angular/core';

import { PlatformService } from './platform.service';

@Component({
    selector: 'app-test',
    standalone: true,
    template: `<div>{{ platformName }}</div>`,
})
export class TestComponent {
    readonly #platformService = inject(PlatformService);

    get platformName(): string {
        return this.#platformService.getName();
    }
}
