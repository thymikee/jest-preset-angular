import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { click } from '../../testing';
import { appProviders } from '../app.config';
import { Hero } from '../model';

import { DashboardHeroComponent } from './dashboard-hero.component';

describe('DashboardHeroComponent when tested directly', () => {
    let comp: DashboardHeroComponent;
    let expectedHero: Hero;
    let fixture: ComponentFixture<DashboardHeroComponent>;
    let heroDe: DebugElement;
    let heroEl: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            providers: appProviders,
            imports: [DashboardHeroComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardHeroComponent);
        comp = fixture.componentInstance;

        heroDe = fixture.debugElement.query(By.css('.hero'));
        heroEl = heroDe.nativeElement;
        expectedHero = { id: 42, name: 'Test Name' };
        fixture.componentRef.setInput('hero', expectedHero);

        fixture.detectChanges();
    });

    it('should display hero name in uppercase', () => {
        const expectedPipedName = expectedHero.name.toUpperCase();

        expect(heroEl.textContent).toContain(expectedPipedName);
    });

    it('should raise selected event when clicked (click helper with DebugElement)', () => {
        let selectedHero: Hero | undefined;
        comp.selected.subscribe((hero: Hero) => (selectedHero = hero));

        click(heroDe);

        expect(selectedHero).toBe(expectedHero);
    });

    it('should raise selected event when clicked (click helper with native element)', () => {
        let selectedHero: Hero | undefined;
        comp.selected.subscribe((hero: Hero) => (selectedHero = hero));

        click(heroEl);

        expect(selectedHero).toBe(expectedHero);
    });
});

describe('DashboardHeroComponent when inside a test host', () => {
    let testHost: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;
    let heroEl: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            providers: appProviders,
            imports: [DashboardHeroComponent, TestHostComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestHostComponent);
        testHost = fixture.componentInstance;
        heroEl = fixture.nativeElement.querySelector('.hero');
        fixture.detectChanges();
    });

    it('should display hero name', () => {
        const expectedPipedName = testHost.hero.name.toUpperCase();

        expect(heroEl.textContent).toContain(expectedPipedName);
    });

    it('should raise selected event when clicked', () => {
        click(heroEl);

        expect(testHost.selectedHero).toBe(testHost.hero);
    });
});

@Component({
    standalone: true,
    imports: [DashboardHeroComponent],
    template: ` <dashboard-hero [hero]="hero" (selected)="onSelected($event)"> </dashboard-hero>`,
})
class TestHostComponent {
    hero: Hero = { id: 42, name: 'Test Name' };
    selectedHero: Hero | undefined;
    onSelected(hero: Hero) {
        this.selectedHero = hero;
    }
}
