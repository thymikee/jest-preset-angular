// For more examples:
//   https://github.com/angular/angular/blob/master/modules/@angular/router/test/integration.spec.ts

import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { DebugElement, Type } from '@angular/core';
import { waitForAsync, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, RouterLinkWithHref } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { jest } from '@jest/globals';
import { of } from 'rxjs';

import { click } from '../testing';

import { AboutComponent } from './about/about.component';
import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroListComponent } from './hero/hero-list.component';
import { HeroModule } from './hero/hero.module'; // should be lazy loaded
import { HeroService } from './model/hero.service';
import { TestHeroService } from './model/testing/test-hero.service';
import { TwainService } from './twain/twain.service';

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let page: Page;
let router: Router;
let location: SpyLocation;

describe('AppComponent & RouterTestingModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [AppModule, RouterTestingModule.withRoutes(routes)],
        providers: [{ provide: HeroService, useClass: TestHeroService }],
      }).compileComponents();
    }),
  );

  it('should navigate to "Dashboard" immediately', fakeAsync(() => {
    createComponent();
    tick(); // wait for async data to arrive
    expectPathToBe('/dashboard');
    expectElementOf(DashboardComponent);
  }));

  it('should navigate to "About" on click', fakeAsync(() => {
    createComponent();
    click(page.aboutLinkDe);
    // page.aboutLinkDe.nativeElement.click(); // ok but fails in phantom

    advance();
    expectPathToBe('/about');
    expectElementOf(AboutComponent);
  }));

  it('should navigate to "About" w/ browser location URL change', fakeAsync(() => {
    createComponent();
    location.simulateHashChange('/about');
    // location.go('/about'); // also works ... except, perhaps, in Stackblitz
    advance();
    expectPathToBe('/about');
    expectElementOf(AboutComponent);
  }));

  // Can't navigate to lazy loaded modules with this technique
  it.skip('should navigate to "Heroes" on click (not working yet)', fakeAsync(() => {
    createComponent();
    page.heroesLinkDe.nativeElement.click();
    advance();
    expectPathToBe('/heroes');
  }));
});

///////// Can't get lazy loaded Heroes to work yet
describe.skip('AppComponent & Lazy Loading (not working yet)', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [AppModule, RouterTestingModule.withRoutes(routes)],
      }).compileComponents();
    }),
  );

  beforeEach(fakeAsync(() => {
    createComponent();
    router.resetConfig([{ path: 'heroes', loadChildren: () => HeroModule }]);
  }));

  it(
    'should navigate to "Heroes" on click',
    waitForAsync(() => {
      page.heroesLinkDe.nativeElement.click();
      advance();
      expectPathToBe('/heroes');
      expectElementOf(HeroListComponent);
    }),
  );

  it('can navigate to "Heroes" w/ browser location URL change', fakeAsync(() => {
    location.go('/heroes');
    advance();
    expectPathToBe('/heroes');
    expectElementOf(HeroListComponent);
  }));
});

////// Helpers /////////

/**
 * Advance to the routed page
 * Wait a tick, then detect changes, and tick again
 */
function advance(): void {
  tick(); // wait while navigating
  fixture.detectChanges(); // update view
  tick(); // wait for async data to arrive
}

function createComponent() {
  fixture = TestBed.createComponent(AppComponent);
  comp = fixture.componentInstance;

  const injector = fixture.debugElement.injector;
  location = injector.get(Location) as SpyLocation;
  router = injector.get(Router);
  router.initialNavigation();
  jest.spyOn(injector.get(TwainService), 'getQuote').mockReturnValue(of('Test Quote'));
  advance();

  page = new Page();
}

class Page {
  aboutLinkDe: DebugElement;
  dashboardLinkDe: DebugElement;
  heroesLinkDe: DebugElement;

  // for debugging
  comp: AppComponent;
  router: Router;
  fixture: ComponentFixture<AppComponent>;

  constructor() {
    const links = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    this.aboutLinkDe = links[2];
    this.dashboardLinkDe = links[0];
    this.heroesLinkDe = links[1];

    // for debugging
    this.comp = comp;
    this.fixture = fixture;
    this.router = router;
  }
}

function expectPathToBe(path: string) {
  expect(location.path()).toEqual(path);
}

function expectElementOf(type: Type<any>): any {
  const el = fixture.debugElement.query(By.directive(type));
  expect(el).toBeTruthy();

  return el;
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
