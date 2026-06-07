import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerComponent } from './banner.component';

describe('BannerComponent', () => {
    let comp: BannerComponent;
    let fixture: ComponentFixture<BannerComponent>;
    let h1: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [BannerComponent],
        }).overrideComponent(BannerComponent, {
            set: { changeDetection: ChangeDetectionStrategy.Default },
        });
        fixture = TestBed.createComponent(BannerComponent);
        comp = fixture.componentInstance;
        h1 = fixture.nativeElement.querySelector('h1');
        fixture.detectChanges();
    });

    it('should display original title', () => {
        expect(h1.textContent).toContain(comp.title);
    });

    it('should still see original title after comp.title change', () => {
        const oldTitle = comp.title;
        comp.title = 'Test Title';

        expect(h1.textContent).toContain(oldTitle);
    });

    it('should display updated title after detectChanges', () => {
        comp.title = 'Test Title';
        fixture.detectChanges();

        expect(h1.textContent).toContain(comp.title);
    });
});
