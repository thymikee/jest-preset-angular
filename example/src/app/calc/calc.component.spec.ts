import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcComponent } from 'app/calc/calc.component';

describe('CalcComponent', () => {
  let component: CalcComponent;
  let fixture: ComponentFixture<CalcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalcComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should snap', () => {
    expect(fixture).toMatchSnapshot();
  });
});
