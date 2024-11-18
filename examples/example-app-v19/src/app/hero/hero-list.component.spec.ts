import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { jest } from '@jest/globals';
import { HighlightDirective } from '@shared/highlight.directive';

import { HeroListComponent } from './hero-list.component';
import { appConfig } from '../app.config';
import { HeroService } from '../model';
import { TestHeroService } from '../model/testing';
import { getTestHeroes } from '../model/testing/test-heroes';

const HEROES = getTestHeroes();

let comp: HeroListComponent;
let fixture: ComponentFixture<HeroListComponent>;
let page: Page;

describe('HeroListComponent', () => {
    beforeEach(waitForAsync(() => {
        const routerSpy = {
            navigate: jest.fn(),
        };

        TestBed.configureTestingModule({
            ...appConfig,
            providers: [
                { provide: HeroService, useClass: TestHeroService },
                { provide: Router, useValue: routerSpy },
            ],
        })
            .compileComponents()
            .then(createComponent);
    }));

    it('should display heroes', () => {
        expect(page.heroRows.length).toBeGreaterThan(0);
    });

    it('1st hero should match 1st test hero', () => {
        const expectedHero = HEROES[0];
        const actualHero = page.heroRows[0].textContent;

        expect(actualHero).toContain(expectedHero.id.toString());
        expect(actualHero).toContain(expectedHero.name);
    });

    it('should select hero on click', fakeAsync(() => {
        const expectedHero = HEROES[1];
        const btn = page.heroRows[1].querySelector('button');

        btn!.dispatchEvent(new Event('click'));
        tick();

        expect(comp.selectedHero).toEqual(expectedHero);
    }));

    it('should navigate to selected hero detail on click', fakeAsync(() => {
        const expectedHero = HEROES[1];
        const btn = page.heroRows[1].querySelector('button');

        btn!.dispatchEvent(new Event('click'));
        tick();

        expect(page.navSpy).toHaveBeenCalled();

        const navArgs = page.navSpy.mock.calls[0][0];
        expect(navArgs[0]).toContain('heroes');
        expect(navArgs[1]).toBe(expectedHero.id);
    }));

    it('should find `HighlightDirective` with `By.directive', () => {
        const h2 = fixture.debugElement.query(By.css('h2'));
        const directive = fixture.debugElement.query(By.directive(HighlightDirective));

        expect(h2).toBe(directive);
    });

    it('should color header with `HighlightDirective`', () => {
        const h2 = page.highlightDe.nativeElement as HTMLElement;
        const bgColor = h2.style.backgroundColor;

        const isExpectedColor = bgColor === 'gold' || bgColor === 'rgb(255, 215, 0)';
        expect(isExpectedColor).toBeTruthy();
    });

    it("the `HighlightDirective` is among the element's providers", () => {
        expect(page.highlightDe.providerTokens).toContain(HighlightDirective);
    });
});

function createComponent() {
    fixture = TestBed.createComponent(HeroListComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    return fixture.whenStable().then(() => {
        fixture.detectChanges();
        page = new Page();
    });
}

class Page {
    heroRows: HTMLLIElement[];
    highlightDe: DebugElement;
    navSpy: ReturnType<typeof jest.spyOn>;

    constructor() {
        const heroRowNodes = fixture.nativeElement.querySelectorAll('li');
        const router = fixture.debugElement.injector.get(Router);
        this.heroRows = Array.from(heroRowNodes);
        this.highlightDe = fixture.debugElement.query(By.directive(HighlightDirective));
        this.navSpy = jest.spyOn(router, 'navigate');
    }
}
