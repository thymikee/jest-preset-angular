import { TestBed } from '@angular/core/testing';

import { FooComponent } from '../foo.component';

describe('FooComponent', () => {
    it('should trigger change detection without fixture.detectChanges', () => {
        TestBed.configureTestingModule({
            imports: [FooComponent],
        });
        const fixture = TestBed.createComponent(FooComponent);

        expect(fixture.componentInstance.value1()).toBe('val1');

        fixture.componentRef.setInput('value1', 'hello');

        expect(fixture.componentInstance.value1()).toBe('hello');
    });
});
