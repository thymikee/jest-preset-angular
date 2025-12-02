import { Location } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { provideLocationMocks, SpyLocation } from '@angular/common/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, Router, RouterLink } from '@angular/router';
import { jest } from '@jest/globals';
import { UserService } from 'libs/user/src/lib/user.service';

import { asyncData, click } from '../testing';

import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { appConfig } from './app.config';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroService } from './model';
import { TestHeroService } from './model/testing';
import { TwainService } from './twain/twain.service';

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let page: Page;
let router: Router;
let location: SpyLocation;

describe('AppComponent & router testing', () => {
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            ...appConfig,
            providers: [
                { provide: HeroService, useClass: TestHeroService },
                UserService,
                TwainService,
                provideHttpClient(),
                provideLocationMocks(),
                provideRouter([
                    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
                    { path: 'about', component: AboutComponent },
                    { path: 'dashboard', component: DashboardComponent },
                ]),
            ],
        }).compileComponents();
    }));

    it('should navigate to "Dashboard" immediately', async () => {
        await createComponent();

        expect(location.path()).toEqual('/dashboard');

        const el = fixture.debugElement.query(By.directive(DashboardComponent));

        expect(el).toBeTruthy();
    });

    it('should navigate to "About" on click', async () => {
        await createComponent();
        click(page.aboutLinkDe);
        await advance();

        expect(location.path()).toEqual('/about');

        const el = fixture.debugElement.query(By.directive(AboutComponent));

        expect(el).toBeTruthy();
    });

    it('should navigate to "About" w/ browser location URL change', async () => {
        await createComponent();
        await router.navigateByUrl('/about');
        await advance();

        expect(location.path()).toEqual('/about');

        const el = fixture.debugElement.query(By.directive(AboutComponent));

        expect(el).toBeTruthy();
    });
});

async function advance(): Promise<void> {
    await fixture.whenStable();
    fixture.detectChanges();
    await fixture.whenStable();
}

async function createComponent(): Promise<void> {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;

    const injector = fixture.debugElement.injector;
    location = injector.get(Location) as SpyLocation;
    router = injector.get(Router);
    router.initialNavigation();
    jest.spyOn(injector.get(TwainService), 'getQuote').mockReturnValue(asyncData('Test Quote'));
    await advance();

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
        const links = fixture.debugElement.queryAll(By.directive(RouterLink));
        this.aboutLinkDe = links[2];
        this.dashboardLinkDe = links[0];
        this.heroesLinkDe = links[1];
        this.comp = comp;
        this.fixture = fixture;
        this.router = router;
    }
}
