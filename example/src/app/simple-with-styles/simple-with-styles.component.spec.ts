import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleWithStylesComponent } from './simple-with-styles.component';
import { ChildComponent } from '../a-bit-more-complex-component/child.component';

describe('SimpleWithStylesComponent', () => {
  let component: SimpleWithStylesComponent;
  let fixture: ComponentFixture<SimpleWithStylesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleWithStylesComponent, ChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleWithStylesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should generate snapshot without nghost/ngcontent', () => {
    expect(fixture).toMatchSnapshot();
  });
});
