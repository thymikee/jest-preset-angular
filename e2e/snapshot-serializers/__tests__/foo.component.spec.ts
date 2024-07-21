import { Component, Input } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import serializer from '../../../build/serializers/ng-snapshot';

@Component({
    selector: 'foo',
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
})
class FooComponent {
    @Input() value1 = 'val1';
    @Input() value2 = 'val2';

    condition1 = true;
    condition2 = false;
}

describe('FooComponent', () => {
    test('should allow generating snapshot with removed component attributes with snapshot serializer option', () => {
        expect.addSnapshotSerializer({
            print: (val, print, indent, options, colors) =>
                serializer.print(
                    val,
                    print,
                    indent,
                    {
                        ...options,
                        omitAllCompAttrs: true,
                    },
                    colors,
                ),
            test: serializer.test,
        });

        TestBed.configureTestingModule({
            declarations: [FooComponent],
        });

        const fixture = TestBed.createComponent(FooComponent);
        fixture.detectChanges();

        expect(fixture).toMatchSnapshot();
        expect(fixture.debugElement.nativeElement).toMatchSnapshot();
    });

    test('should allow generating snapshot', () => {
        expect.addSnapshotSerializer(serializer);
        TestBed.configureTestingModule({
            declarations: [FooComponent],
        });

        const fixture = TestBed.createComponent(FooComponent);
        fixture.detectChanges();

        expect(fixture).toMatchSnapshot();
        expect(fixture.debugElement.nativeElement).toMatchSnapshot();
    });
});
