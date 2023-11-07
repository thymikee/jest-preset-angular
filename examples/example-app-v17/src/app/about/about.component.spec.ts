import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { HighlightDirective } from '../shared/highlight.directive';
import { TwainService } from '../twain/twain.service';

import { AboutComponent } from './about.component';

let fixture: ComponentFixture<AboutComponent>;

describe('AboutComponent (highlightDirective)', () => {
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [AboutComponent, HighlightDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .overrideProvider(TwainService, {
        useValue: {
          getQuote: jest.fn().mockReturnValue(of('Test Quote')),
        },
      })
      .createComponent(AboutComponent);
    fixture.detectChanges();
  });

  it('should have skyblue <h2>', () => {
    const h2: HTMLElement = fixture.nativeElement.querySelector('h2');
    const bgColor = h2.style.backgroundColor;
    expect(bgColor).toBe('skyblue');
  });
});
