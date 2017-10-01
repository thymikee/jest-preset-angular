import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TestBed, async, fakeAsync, tick} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {AppComponent} from './app.component';

describe('AppComponent', () => {
  let fixture;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [AppComponent],
        imports: [NoopAnimationsModule],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it(
    'should create the app',
    async(() => {
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    })
  );

  it('snaps', () => {
    expect(fixture).toMatchSnapshot();
  });

  it(
    `should have as title 'app works!'`,
    async(() => {
      const app = fixture.debugElement.componentInstance;
      expect(app.title).toEqual('app works!');
    })
  );

  it(
    'should render title in a h1 tag',
    async(() => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h1').textContent).toContain('app works!');
    })
  );

  it('looks async but is synchronous', <any>fakeAsync((): void => {
    let flag = false;
    setTimeout(() => {
      flag = true;
    }, 100);
    expect(flag).toBe(false);
    tick(50);
    expect(flag).toBe(false);
    tick(50);
    expect(flag).toBe(true);
  }));
});
