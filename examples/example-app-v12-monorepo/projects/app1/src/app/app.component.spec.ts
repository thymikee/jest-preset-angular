import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { AppEnvironment, APP_ENVIRONMENT } from './configs/environment.config';
import { FooService } from './services/foo.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let debugEl: DebugElement;

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule({
        declarations: [AppComponent],
        providers: [
          FooService,
          {
            provide: APP_ENVIRONMENT,
            useFactory: () => new AppEnvironment(),
          },
        ],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(AppComponent);
          component = fixture.componentInstance;
          debugEl = fixture.debugElement;
          fixture.detectChanges();
        });
    }),
  );

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'app1'`, () => {
    expect(component.title).toEqual('app1');
  });

  it('should render title', () => {
    expect((<HTMLElement>debugEl.nativeElement).querySelector('.content span')?.textContent).toContain(
      'app1 app is running!',
    );
  });
});
