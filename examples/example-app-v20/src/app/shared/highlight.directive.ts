import { Directive, ElementRef, Input, OnChanges, inject } from '@angular/core';

@Directive({ selector: '[highlight]' })
export class HighlightDirective implements OnChanges {
    private readonly el = inject(ElementRef);

    defaultColor = 'rgb(211, 211, 211)'; // lightgray

    @Input('highlight') bgColor = '';

    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);

    constructor() {
        const el = this.el;

        el.nativeElement.style.customProperty = true;
    }

    ngOnChanges() {
        this.el.nativeElement.style.backgroundColor = this.bgColor || this.defaultColor;
    }
}
