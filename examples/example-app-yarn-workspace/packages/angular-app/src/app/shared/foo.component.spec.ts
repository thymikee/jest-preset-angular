import { ComponentFixture, TestBed } from '@angular/core/testing';
import { REQUEST } from '@shared/app.tokens';

import { FOO_COMPONENT_DATA_TOKEN, FooComponent } from './foo.component';

describe('FooComponent', () => {
    let fixture: ComponentFixture<FooComponent>;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            providers: [
                {
                    provide: REQUEST,
                    useValue: {},
                },
                {
                    provide: FOO_COMPONENT_DATA_TOKEN,
                    useValue: {
                        title: '',
                        error: new Map(),
                    },
                },
            ],
        }).createComponent(FooComponent);
        fixture.detectChanges();
    });

    it('should have <h1>', () => {
        const h1: HTMLElement = fixture.nativeElement.querySelector('h1');

        expect(h1).toBeDefined();
    });
});
