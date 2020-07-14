import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgReflectAsTextComponent } from './ng-reflect-as-text.component';

describe('NgReflectAsTextComponent', () => {
  let component: NgReflectAsTextComponent;
  let fixture: ComponentFixture<NgReflectAsTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgReflectAsTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgReflectAsTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('snapshots', () => {
    expect(fixture).toMatchSnapshot();
  });
});
