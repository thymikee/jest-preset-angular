import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterLink, RouterOutlet } from '@angular/router';

import { RouterLinkDirectiveStub } from '../testing';

import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { WelcomeComponent } from './welcome/welcome.component';

@Component({ selector: 'app-banner', template: '', standalone: true })
class BannerStubComponent {}

@Component({ selector: 'router-outlet', template: '', standalone: true })
class RouterOutletStubComponent {}

@Component({ selector: 'app-welcome', template: '', standalone: true })
class WelcomeStubComponent {}

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;

describe('AppComponent & TestModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
    })
      .overrideComponent(AppComponent, {
        remove: { imports: [RouterLink, RouterOutlet, WelcomeComponent, BannerComponent] },
        add: {
          imports: [RouterLinkDirectiveStub, RouterOutletStubComponent, BannerStubComponent, WelcomeStubComponent],
        },
      })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        comp = fixture.componentInstance;
      });
  }));
  tests();
});

describe('AppComponent & NO_ERRORS_SCHEMA', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(AppComponent, {
        remove: { imports: [RouterLink, RouterOutlet, WelcomeComponent, BannerComponent] },
        add: {
          imports: [RouterLinkDirectiveStub, RouterOutletStubComponent, BannerStubComponent, WelcomeStubComponent],
        },
      })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        comp = fixture.componentInstance;
      });
  }));
  tests();
});

describe('AppComponent & AppModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({ imports: [AppComponent] })
      .overrideComponent(AppComponent, {
        remove: { imports: [RouterLink, RouterOutlet, BannerComponent, WelcomeComponent] },
        add: {
          imports: [RouterLinkDirectiveStub, RouterOutletStubComponent, BannerStubComponent, WelcomeStubComponent],
        },
      })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        comp = fixture.componentInstance;
      });
  }));

  tests();
});

function tests() {
  let routerLinks: RouterLinkDirectiveStub[];
  let debugElements: DebugElement[];

  beforeEach(() => {
    fixture.detectChanges();
    debugElements = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
    routerLinks = debugElements.map((de) => de.injector.get(RouterLinkDirectiveStub));
  });

  it('can instantiate the component', () => {
    expect(comp).not.toBeNull();
  });

  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).toEqual(3);
    expect(routerLinks[0].linkParams).toBe('/dashboard');
    expect(routerLinks[1].linkParams).toBe('/heroes');
    expect(routerLinks[2].linkParams).toBe('/about');
  });

  it('can click Heroes link in template', () => {
    const heroesLinkDe = debugElements[1];
    const heroesLink = routerLinks[1];
    expect(heroesLink.navigatedTo).toBeNull();
    heroesLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(heroesLink.navigatedTo).toBe('/heroes');
  });
}
