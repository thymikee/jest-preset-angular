import { provideHttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';
import { UserService } from '../model';
import { TwainService } from '../twain/twain.service';

let fixture: ComponentFixture<AboutComponent>;

describe('AboutComponent (highlightDirective)', () => {
    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [AboutComponent],
            providers: [provideHttpClient(), TwainService, UserService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).createComponent(AboutComponent);
        fixture.detectChanges();
    });

    it('should have skyblue <h2>', () => {
        const h2: HTMLElement = fixture.nativeElement.querySelector('h2');
        const bgColor = h2.style.backgroundColor;

        expect(bgColor).toBe('skyblue');
    });
});
