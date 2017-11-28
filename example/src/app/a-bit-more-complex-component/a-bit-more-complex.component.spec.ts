/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ABitMoreComplexComponent } from './a-bit-more-complex.component';
import { ChildComponent } from './child.component';

describe('ABitMoreComplexComponent', () => {
  let component: ABitMoreComplexComponent;
  let fixture: ComponentFixture<ABitMoreComplexComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ABitMoreComplexComponent, ChildComponent],
      })
        .overrideComponent(ChildComponent, {set: {template: 'stubbedBody'}})
        .compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ABitMoreComplexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('snapshot test', () => {
    expect(fixture).toMatchSnapshot();
  });
});
