/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumComponent } from './medium.component';
import { ChildComponent } from './child.component';

describe('MediumComponent', () => {
  let component: MediumComponent;
  let fixture: ComponentFixture<MediumComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [MediumComponent, ChildComponent],
      })
        .overrideComponent(ChildComponent, {set: {template: 'stubbedBody'}})
        .compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MediumComponent);
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
