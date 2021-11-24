import { ComponentFixtureAutoDetect } from '@angular/core/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerComponent } from './banner.component';

describe('BannerComponent (AutoChangeDetect)', () => {
  let comp: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let h1: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BannerComponent],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
    });
    fixture = TestBed.createComponent(BannerComponent);
    comp = fixture.componentInstance;
    h1 = fixture.nativeElement.querySelector('h1');
  });

  it('should display original title', () => {
    // Hooray! No `fixture.detectChanges()` needed
    expect(h1.textContent).toContain(comp.title);
  });

  it('should still see original title after comp.title change', () => {
    const oldTitle = comp.title;
    comp.title = 'Test Title';
    // Displayed title is old because Angular didn't hear the change :(
    expect(h1.textContent).toContain(oldTitle);
  });

  it('should display updated title after detectChanges', () => {
    comp.title = 'Test Title';
    fixture.detectChanges(); // detect changes explicitly
    expect(h1.textContent).toContain(comp.title);
  });
});

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
