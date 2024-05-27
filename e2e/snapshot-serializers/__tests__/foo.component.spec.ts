import { Component, Input } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';

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

test('snapshot should work', waitForAsync(() => {
    TestBed.configureTestingModule({
        declarations: [FooComponent],
    });

    const fixture = TestBed.createComponent(FooComponent);
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
    expect(fixture.debugElement.nativeElement).toMatchSnapshot();
}));
