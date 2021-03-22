import { async, ComponentFixture } from '@angular/core/testing';

import { ConfigureFn, configureTests } from '../__helpers__';

import { CalcComponent } from './calc.component';

describe('CalcComponent', () => {
  let fixture: ComponentFixture<CalcComponent>;

  beforeEach(async(() => {
    const configure: ConfigureFn = (testBed) => {
      testBed.configureTestingModule({
        declarations: [CalcComponent],
      });
    };

    configureTests(configure).then((testBed) => {
      fixture = testBed.createComponent(CalcComponent);
      fixture.detectChanges();
    });
  }));

  test('should snap', () => {
    expect(fixture).toMatchSnapshot();
  });
});
