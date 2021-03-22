import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildComponent } from './child.component';
import { MediumComponent } from './medium.component';

describe('MediumComponent', () => {
  let component: MediumComponent;
  let fixture: ComponentFixture<MediumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MediumComponent, ChildComponent],
    })
      .overrideComponent(ChildComponent, { set: { template: 'stubbedBody' } })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('snapshot test', () => {
    expect(fixture).toMatchSnapshot();
  });
});
