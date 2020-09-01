import { async, ComponentFixture } from '@angular/core/testing';

import { configureTests, ConfigureFn } from '@lib/testing';

import { CalcComponent } from './calc.component';

describe('CalcComponent', () => {
  let component: CalcComponent;
  let fixture: ComponentFixture<CalcComponent>;

  beforeEach(
    async(() => {
      const configure: ConfigureFn = testBed => {
        testBed.configureTestingModule({
          declarations: [CalcComponent]
        });
      };

      configureTests(configure).then(testBed => {
        fixture = testBed.createComponent(CalcComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
    })
  );

  it('should snap', () => {
    expect(fixture).toMatchSnapshot();
  });
});
