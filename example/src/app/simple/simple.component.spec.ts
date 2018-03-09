import { async, ComponentFixture } from '@angular/core/testing';

import {ConfigureFn, configureTests} from '@lib/testing';

import { SimpleComponent } from './simple.component';

describe('SimpleComponent', () => {
  let component: SimpleComponent;
  let fixture: ComponentFixture<SimpleComponent>;

  beforeEach(
    async(() => {
      const configure: ConfigureFn = testBed => {
        testBed.configureTestingModule({
          declarations: [ SimpleComponent ]
        });
      };

      configureTests(configure).then(testBed => {
        fixture = testBed.createComponent(SimpleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('snapshots', () => {
    expect(fixture).toMatchSnapshot();
  })
});
