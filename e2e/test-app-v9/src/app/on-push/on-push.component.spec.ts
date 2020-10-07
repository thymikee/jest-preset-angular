import { async, ComponentFixture } from '@angular/core/testing';
import { ChangeDetectionStrategy } from '@angular/core';

import { ConfigureFn, configureTests } from '@lib/testing';

import { OnPushComponent } from './on-push.component';

describe('OnPushComponent', () => {
  let component: OnPushComponent;
  let fixture: ComponentFixture<OnPushComponent>;

  beforeEach(
    async(() => {
      const configure: ConfigureFn = testBed => {
        testBed.configureTestingModule({
          declarations: [ OnPushComponent ]
        })
        .overrideComponent(OnPushComponent, {
          set: { changeDetection: ChangeDetectionStrategy.Default },
        });
      };

      configureTests(configure).then(testBed => {
        fixture = testBed.createComponent(OnPushComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should snapshot pizza name @Input`, () => {
    component.name = 'Chilli pizza';
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it(`should reflect toppings @Input() via *ngFor`, () => {
    component.name = 'Chilli pizza';
    component.toppings = ['first'];
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();

    component.toppings = ['anchovy', 'tomato', 'chili'];
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });
});
