import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, ɵivyEnabled as ivyEnabled } from '@angular/core';

import { AnimationsComponent } from './animations.component';
import { ConfigureFn, configureTests } from '../__helpers__';

describe('AnimationsComponent', () => {
  let fixture: ComponentFixture<AnimationsComponent>;
  let component: AnimationsComponent;

  beforeEach(async(() => {
    const configure: ConfigureFn = testBed => {
      testBed.configureTestingModule({
        declarations: [AnimationsComponent],
        imports: [NoopAnimationsModule],
        schemas: [NO_ERRORS_SCHEMA]
      });
    };

    configureTests(configure).then(testBed => {
      fixture = testBed.createComponent(AnimationsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  test('Ivy should be enabled', () => {
    expect(ivyEnabled).toBeTruthy();
  });

  test('should create the app', async(() => {
    const app = component;
    expect(app).toBeTruthy();
  }));

  test('snaps', () => {
    expect(fixture).toMatchSnapshot();
  });

  test(`should have as title 'app works!'`, async(() => {
    const app = component;
    expect(app.title).toEqual('app works!');
  }));

  test('should render title in a h1 tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('app works!');
  }));
});
