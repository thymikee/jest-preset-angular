import { TestBed } from '@angular/core/testing';

import { onNodeVersions } from '../../utils';
import { FooComponent } from '../foo.component';

onNodeVersions('>=20', () => {
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
