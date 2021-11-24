import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightDirective } from '../shared/highlight.directive';

import { AboutComponent } from './about.component';

let fixture: ComponentFixture<AboutComponent>;

describe('AboutComponent (highlightDirective)', () => {
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [AboutComponent, HighlightDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).createComponent(AboutComponent);
    fixture.detectChanges(); // initial binding
  });

  it('should have skyblue <h2>', () => {
    const h2: HTMLElement = fixture.nativeElement.querySelector('h2');
    const bgColor = h2.style.backgroundColor;
    expect(bgColor).toBe('skyblue');
  });
});

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
