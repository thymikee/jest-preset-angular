import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { async, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, ɵivyEnabled as ivyEnabled } from '@angular/core';

import { ConfigureFn, configureTests } from '@lib/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    const configure: ConfigureFn = testBed => {
      testBed.configureTestingModule({
        declarations: [AppComponent],
        imports: [NoopAnimationsModule],
        schemas: [NO_ERRORS_SCHEMA]
      });
    };

    configureTests(configure).then(testBed => {
      fixture = testBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('Ivy should be enabled', () => {
    expect(ivyEnabled).toBeTruthy();
  });

  it('should create the app', async(() => {
    const app = component;
    expect(app).toBeTruthy();
  }));

  it('snaps', () => {
    expect(fixture).toMatchSnapshot();
  });

  it(`should have as title 'app works!'`, async(() => {
    const app = component;
    expect(app.title).toEqual('app works!');
  }));

  it('should render title in a h1 tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('app works!');
  }));

  it(
    'looks async but is synchronous',
    <any>fakeAsync((): void => {
      let flag = false;
      setTimeout(() => {
        flag = true;
      }, 100);
      expect(flag).toBe(false);
      tick(50);
      expect(flag).toBe(false);
      tick(50);
      expect(flag).toBe(true);
    })
  );

  it(
    'async should work',
    <any>async((): void => {
      let flag = false;
      setTimeout(() => {
        flag = true;
        expect(flag).toBe(true);
      }, 100);
    })
  );

  it('test with done should work', (done): void => {
    let flag = false;
    setTimeout(() => {
      flag = true;
      expect(flag).toBe(true);
      done();
    }, 100);
  });

  it('async with done should work', async done => {
    let flag = false;
    setTimeout(() => {
      flag = true;
      expect(flag).toBe(true);
      done();
    }, 100);
  });

  it.each([[1, 2]])('it.each', (arg1, arg2) => {
    expect(arg1).toBe(1);
    expect(arg2).toBe(2);
  });

  it.each([2])('it.each with 1D array', arg1 => {
    expect(arg1).toBe(2);
  });

  (it.each([2]) as any)('it.each with 1D array and done', (arg1, done) => {
    expect(arg1).toBe(2);
    done();
  });

  (it.each([[1, 2]]) as any)('it.each with done', (arg1, arg2, done) => {
    expect(arg1).toBe(1);
    expect(arg2).toBe(2);
    done();
  });

  it.each`
    foo  | bar
    ${1} | ${2}
  `('it.each should work with table as a tagged template literal', ({ foo, bar }) => {
    expect(foo).toBe(1);
    expect(bar).toBe(2);
  });

  (it.each`
    foo  | bar
    ${1} | ${2}
  ` as any)(
    'it.each should work with table as a tagged template literal with done',
    ({ foo, bar }, done) => {
      expect(foo).toBe(1);
      expect(bar).toBe(2);
      done();
    }
  );

  it.each`
    foo  | bar
    ${1} | ${2}
  `('(async) it.each should work with table as a tagged template literal', async ({ foo, bar }) => {
    expect(foo).toBe(1);
    expect(bar).toBe(2);
  });
});

test.todo('a sample todo');
