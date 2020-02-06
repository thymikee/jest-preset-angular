import { async, ComponentFixture } from '@angular/core/testing';

import { configureTests, ConfigureFn } from '@lib/testing';

import { CalcComponent } from 'src/app/calc/calc.component';

describe('CalcComponent', () => {
  let component: CalcComponent;
  let fixture: ComponentFixture<CalcComponent>;

  beforeEach(async(() => {
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
  }));

  it('should snap', () => {
    if (global['JpaTestMode'] === 'ts-jest') {
      expect(fixture).toMatchInlineSnapshot(`
<app-calc
  hasAClass="false"
  image={[Function String]}
  prop1={[Function Number]}
>
  <p
    class="a-default-class"
  >
     calc works! 1337 another text node test-image-stub 
  </p>
</app-calc>
`);
    } else {
      expect(fixture).toMatchInlineSnapshot(`
<app-calc
  hasAClass="false"
  image={[Function String]}
  observable$="undefined"
  prop1={[Function Number]}
>
  <p
    class="a-default-class"
  >
     calc works! 1337 another text node test-image-stub 
  </p>
</app-calc>
`);
    }
  });
});
