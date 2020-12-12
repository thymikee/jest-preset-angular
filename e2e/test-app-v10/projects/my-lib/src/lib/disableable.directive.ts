import { Directive, ElementRef, Input } from '@angular/core';

/**
 * A base class for components that can be disabled, and that store their disabled
 * state in the HTML element. This prevents the HTML element from being focused or clicked,
 * and can be used for CSS selectors.
 */
@Directive()
export abstract class DisableableDirective {

  /** Binds to the HTML disabled property OR disabled attribute, if present. */
  @Input()
  public set disabled(v: boolean) {
    const elt = this.elementRef.nativeElement;
    const disabledProp = (elt as any).disabled;
    if (typeof (disabledProp) === 'boolean') {
      // Set disabled property
      (elt as any).disabled = v;
      return;
    }

    // Set disabled attribute
    elt.setAttribute('disabled', v.toString());
  }
  public get disabled(): boolean {
    const elt = this.elementRef.nativeElement;
    const disabledProp = (elt as any).disabled;
    if (typeof (disabledProp) === 'boolean') {
      return disabledProp;
    }
    const disabledAttr = elt.getAttribute('disabled');
    return disabledAttr === 'true';
  }

  constructor(public elementRef: ElementRef<HTMLElement>) { }
}
