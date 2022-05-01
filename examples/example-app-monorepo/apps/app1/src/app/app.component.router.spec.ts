import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { DebugElement } from '@angular/core';
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
import { HeroService } from './model/hero.service';
import { TestHeroService } from './model/testing/test-hero.service';
import { TwainService } from './twain/twain.service';

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let page: Page;
let router: Router;
let location: SpyLocation;

describe('AppComponent & RouterTestingModule', () => {
  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule.withRoutes(routes)],
      providers: [{ provide: HeroService, useClass: TestHeroService }],
    }).compileComponents();
  }));

  it('should navigate to "Dashboard" immediately', fakeAsync(() => {
    createComponent();
    tick();
    expect(location.path()).toEqual('/dashboard');
    const el = fixture.debugElement.query(By.directive(DashboardComponent));
    expect(el).toBeTruthy();
  }));

  it('should navigate to "About" on click', fakeAsync(() => {
    createComponent();
    click(page.aboutLinkDe);
    advance();
    expect(location.path()).toEqual('/about');
    const el = fixture.debugElement.query(By.directive(AboutComponent));
    expect(el).toBeTruthy();
  }));

  it('should navigate to "About" w/ browser location URL change', fakeAsync(() => {
    createComponent();
    location.simulateHashChange('/about');
    advance();
    expect(location.path()).toEqual('/about');
    const el = fixture.debugElement.query(By.directive(AboutComponent));
    expect(el).toBeTruthy();
  }));
});

function advance(): void {
  tick();
  fixture.detectChanges();
  tick();
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

  comp: AppComponent;
  router: Router;
  fixture: ComponentFixture<AppComponent>;

  constructor() {
    const links = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    this.aboutLinkDe = links[2];
    this.dashboardLinkDe = links[0];
    this.heroesLinkDe = links[1];
    this.comp = comp;
    this.fixture = fixture;
    this.router = router;
  }
}
