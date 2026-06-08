import { Directive, ElementRef, inject, Input, OnChanges, OnInit } from '@angular/core';

@Directive({ selector: '[highlight]' })
export class HighlightDirective implements OnChanges, OnInit {
    defaultColor = 'rgb(211, 211, 211)'; // lightgray

    @Input('highlight') bgColor = '';

    private readonly el = inject(ElementRef);

    ngOnInit() {
        this.el.nativeElement.style.customProperty = true;
    }

    ngOnChanges() {
        this.el.nativeElement.style.backgroundColor = this.bgColor || this.defaultColor;
    }
}
