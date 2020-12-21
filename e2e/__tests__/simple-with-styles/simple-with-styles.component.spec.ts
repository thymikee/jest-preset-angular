import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleWithStylesComponent } from './simple-with-styles.component';
import { ChildComponent } from '../medium/child.component';

describe('SimpleWithStylesComponent', () => {
  let fixture: ComponentFixture<SimpleWithStylesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleWithStylesComponent, ChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleWithStylesComponent);
    fixture.detectChanges();
  });

  test('should generate snapshot without nghost/ngcontent', () => {
    expect(fixture).toMatchSnapshot();
  });
});
