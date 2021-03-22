import { Component } from '@angular/core';
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
class FooComponent {}

test(
  'snapshot should work',
  waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FooComponent],
    });

    const fixture = TestBed.createComponent(FooComponent);
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement).toMatchSnapshot();
  }),
);
