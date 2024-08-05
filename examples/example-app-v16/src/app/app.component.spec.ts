import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, Router, RouterLink } from '@angular/router';

import { AppComponent } from './app.component';
import { appConfig } from './app.config';
import { UserService } from './model';

@Component({ standalone: true, selector: 'app-banner', template: '' })
class BannerStubComponent {}

@Component({ standalone: true, selector: 'router-outlet', template: '' })
class RouterOutletStubComponent {}

@Component({ standalone: true, selector: 'app-welcome', template: '' })
class WelcomeStubComponent {}

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;

describe('AppComponent & TestModule', () => {
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            ...appConfig,
            imports: [AppComponent, BannerStubComponent, RouterLink, RouterOutletStubComponent, WelcomeStubComponent],
            providers: [provideRouter([]), UserService],
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
            ...appConfig,
            imports: [AppComponent, BannerStubComponent, RouterLink],
            providers: [provideRouter([]), UserService],
            schemas: [NO_ERRORS_SCHEMA],
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
    let routerLinks: RouterLink[];
    let linkDes: DebugElement[];

    beforeEach(() => {
        fixture.detectChanges();
        linkDes = fixture.debugElement.queryAll(By.directive(RouterLink));
        routerLinks = linkDes.map((de) => de.injector.get(RouterLink));
    });

    it('can instantiate the component', () => {
        expect(comp).not.toBeNull();
    });

    it('can get RouterLinks from template', () => {
        expect(routerLinks.length).toEqual(3);
        expect(routerLinks[0].href).toContain('/dashboard');
        expect(routerLinks[1].href).toContain('/heroes');
        expect(routerLinks[2].href).toContain('/about');
    });

    it('can click Heroes link in template', fakeAsync(() => {
        const heroesLinkDe = linkDes[1];
        TestBed.inject(Router).resetConfig([{ path: '**', children: [] }]);

        heroesLinkDe.triggerEventHandler('click', { button: 0 });
        tick();
        fixture.detectChanges();

        expect(TestBed.inject(Router).url).toBe('/heroes');
    }));
}
