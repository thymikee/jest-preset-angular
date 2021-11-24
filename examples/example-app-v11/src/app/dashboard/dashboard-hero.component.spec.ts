import { DebugElement } from '@angular/core';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { first } from 'rxjs/operators';

import { click } from '../../testing';
import { Hero } from '../model/hero';

import { DashboardHeroComponent } from './dashboard-hero.component';

describe('DashboardHeroComponent class only', () => {
  it('raises the selected event when clicked', () => {
    const comp = new DashboardHeroComponent();
    const hero: Hero = { id: 42, name: 'Test' };
    comp.hero = hero;

    comp.selected.pipe(first()).subscribe((selectedHero: Hero) => expect(selectedHero).toBe(hero));
    comp.click();
  });
});

describe('DashboardHeroComponent when tested directly', () => {
  let comp: DashboardHeroComponent;
  let expectedHero: Hero;
  let fixture: ComponentFixture<DashboardHeroComponent>;
  let heroDe: DebugElement;
  let heroEl: HTMLElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({ declarations: [DashboardHeroComponent] }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardHeroComponent);
    comp = fixture.componentInstance;

    // find the hero's DebugElement and element
    heroDe = fixture.debugElement.query(By.css('.hero'));
    heroEl = heroDe.nativeElement;

    // mock the hero supplied by the parent component
    expectedHero = { id: 42, name: 'Test Name' };

    // simulate the parent setting the input property with that hero
    comp.hero = expectedHero;

    // trigger initial data binding
    fixture.detectChanges();
  });

  it('should display hero name in uppercase', () => {
    const expectedPipedName = expectedHero.name.toUpperCase();
    expect(heroEl.textContent).toContain(expectedPipedName);
  });

  it('should raise selected event when clicked (triggerEventHandler)', () => {
    let selectedHero: Hero | undefined;
    comp.selected.pipe(first()).subscribe((hero: Hero) => (selectedHero = hero));

    heroDe.triggerEventHandler('click', null);
    expect(selectedHero).toBe(expectedHero);
  });

  it('should raise selected event when clicked (element.click)', () => {
    let selectedHero: Hero | undefined;
    comp.selected.pipe(first()).subscribe((hero: Hero) => (selectedHero = hero));

    heroEl.click();
    expect(selectedHero).toBe(expectedHero);
  });

  it('should raise selected event when clicked (click helper with DebugElement)', () => {
    let selectedHero: Hero | undefined;
    comp.selected.pipe(first()).subscribe((hero: Hero) => (selectedHero = hero));

    click(heroDe); // click helper with DebugElement

    expect(selectedHero).toBe(expectedHero);
  });

  it('should raise selected event when clicked (click helper with native element)', () => {
    let selectedHero: Hero | undefined;
    comp.selected.pipe(first()).subscribe((hero: Hero) => (selectedHero = hero));

    click(heroEl); // click helper with native element

    expect(selectedHero).toBe(expectedHero);
  });
});

//////////////////

describe('DashboardHeroComponent when inside a test host', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let heroEl: HTMLElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({ declarations: [DashboardHeroComponent, TestHostComponent] }).compileComponents();
    }),
  );

  beforeEach(() => {
    // create TestHostComponent instead of DashboardHeroComponent
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    heroEl = fixture.nativeElement.querySelector('.hero');
    fixture.detectChanges(); // trigger initial data binding
  });

  it('should display hero name', () => {
    const expectedPipedName = testHost.hero.name.toUpperCase();
    expect(heroEl.textContent).toContain(expectedPipedName);
  });

  it('should raise selected event when clicked', () => {
    click(heroEl);
    // selected hero should be the same data bound hero
    expect(testHost.selectedHero).toBe(testHost.hero);
  });
});

@Component({
  template: ` <dashboard-hero [hero]="hero" (selected)="onSelected($event)"> </dashboard-hero>`,
})
class TestHostComponent {
  hero: Hero = { id: 42, name: 'Test Name' };
  selectedHero: Hero | undefined;
  onSelected(hero: Hero) {
    this.selectedHero = hero;
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
