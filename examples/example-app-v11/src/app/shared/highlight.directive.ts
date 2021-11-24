// tslint:disable: directive-selector
import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({ selector: '[highlight]' })
/**
 * Set backgroundColor for the attached element to highlight color
 * and set the element's customProperty to true
 */
export class HighlightDirective implements OnChanges {
  defaultColor = 'rgb(211, 211, 211)'; // lightgray

  @Input('highlight') bgColor = '';

  constructor(private el: ElementRef) {
    el.nativeElement.style.customProperty = true;
  }

  ngOnChanges() {
    this.el.nativeElement.style.backgroundColor = this.bgColor || this.defaultColor;
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
