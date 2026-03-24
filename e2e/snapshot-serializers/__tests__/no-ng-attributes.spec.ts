import { TestBed } from '@angular/core/testing';

import serializer from '../../../build/serializers/no-ng-attributes';
import { MaterialCDKTestComponent } from '../material-cdk-test.component';

describe('MaterialCDKTestComponent', () => {
    test('should clean CDK and Material dynamic attributes from snapshot', () => {
        expect.addSnapshotSerializer(serializer);
        TestBed.configureTestingModule({
            imports: [MaterialCDKTestComponent],
        });
        const fixture = TestBed.createComponent(MaterialCDKTestComponent);

        fixture.detectChanges();

        expect(fixture).toMatchSnapshot();
        expect(fixture.debugElement.nativeElement).toMatchSnapshot();
    });
});
