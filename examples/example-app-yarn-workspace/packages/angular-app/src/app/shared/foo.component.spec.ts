import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooComponent } from './foo.component';

let fixture: ComponentFixture<FooComponent>;

// eslint-disable-next-line jest/no-disabled-tests
describe.skip('FooComponent', () => {
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [FooComponent],
    }).createComponent(FooComponent);
    fixture.detectChanges();
  });

  it('should have <h1>', () => {
    const h1: HTMLElement = fixture.nativeElement.querySelector('h1');

    expect(h1).toBeDefined();
  });
});
