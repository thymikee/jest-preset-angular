import { fakeAsync, ComponentFixture, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { jest } from '@jest/globals';
import { Observable, of, throwError } from 'rxjs';
import { last, tap } from 'rxjs/operators';

import { TwainComponent } from './twain.component';
import { TwainService } from './twain.service';

describe('TwainComponent', () => {
  let fixture: ComponentFixture<TwainComponent>;
  let component: TwainComponent;
  let twainService: TwainService;

  let getQuoteSpy: ReturnType<typeof jest.spyOn>;
  let quoteEl: HTMLElement;
  const testQuote = 'Test Quote';

  const errorMessage = () => {
    const el = fixture.nativeElement.querySelector('.error');

    return el ? el.textContent : null;
  };

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule({
        declarations: [TwainComponent],
        providers: [
          {
            provide: TwainService,
            useValue: {
              getQuote: jest.fn(),
            },
          },
        ],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(TwainComponent);
          component = fixture.componentInstance;
          quoteEl = fixture.nativeElement.querySelector('.twain');
          twainService = TestBed.inject(TwainService);
          getQuoteSpy = jest.spyOn(twainService, 'getQuote');

          getQuoteSpy.mockImplementation(() => of(testQuote));
        });
    }),
  );

  describe('when test with synchronous observable', () => {
    it('should not show quote before OnInit', () => {
      expect(quoteEl.textContent).toBe('');
      expect(errorMessage()).toBeNull();
      expect(getQuoteSpy.mock.calls.length).toBeFalsy();
    });

    it('should show quote after component initialized', () => {
      fixture.detectChanges();

      expect(quoteEl.textContent).toBe(testQuote);
      expect(getQuoteSpy.mock.calls.length).toBeTruthy();
    });

    it('should display error when TwainService fails', fakeAsync(() => {
      getQuoteSpy.mockReturnValue(throwError('TwainService test failure'));

      fixture.detectChanges();

      tick();

      fixture.detectChanges();

      expect(errorMessage()).toMatch(/test failure/);
      expect(quoteEl.textContent).toBe('...');
    }));
  });

  describe('when test with asynchronous observable', () => {
    beforeEach(() => {
      getQuoteSpy.mockClear();
      getQuoteSpy.mockImplementation(
        () =>
          new Observable<typeof testQuote>((observer) => {
            setTimeout(() => {
              observer.next(testQuote);
              observer.complete();
            }, 0);
          }),
      );
    });

    it('should not show quote before OnInit', () => {
      expect(quoteEl.textContent).toBe('');
      expect(errorMessage()).toBeNull();
      expect(getQuoteSpy.mock.calls.length).toBeFalsy();
    });

    it('should still not show quote after component initialized', () => {
      expect(quoteEl.textContent).toBe('');
      fixture.detectChanges();
      expect(quoteEl.textContent).toBe('...');
      expect(errorMessage()).toBeNull();
      expect(getQuoteSpy.mock.calls.length).toBeTruthy();
    });

    it('should show quote after getQuote (fakeAsync)', fakeAsync(() => {
      fixture.detectChanges();
      expect(quoteEl.textContent).toBe('...');

      tick();
      fixture.detectChanges();

      expect(quoteEl.textContent).toBe(testQuote);
      expect(errorMessage()).toBeNull();
    }));

    it(
      'should show quote after getQuote (waitForAsync)',
      waitForAsync(() => {
        fixture.detectChanges();
        expect(quoteEl.textContent).toBe('...');

        fixture.whenStable().then(() => {
          fixture.detectChanges();
          expect(quoteEl.textContent).toBe(testQuote);
          expect(errorMessage()).toBeNull();
        });
      }),
    );

    it('should show last quote (async)', async () => {
      fixture.detectChanges();

      await component.quote
        .pipe(last())
        .pipe(
          tap(() => {
            fixture.detectChanges();
            expect(quoteEl.textContent).toBe(testQuote);
            expect(errorMessage()).toBeNull();
          }),
        )
        .toPromise();
    });

    it(
      'should show quote after getQuote',
      waitForAsync(() => {
        fixture.detectChanges();

        twainService.getQuote().subscribe(() => {
          fixture.detectChanges();
          expect(quoteEl.textContent).toBe(testQuote);
          expect(errorMessage()).toBeNull();
        });
      }),
    );

    it('should display error when TwainService fails', fakeAsync(() => {
      getQuoteSpy.mockReturnValue(throwError('TwainService test failure'));

      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(errorMessage()).toMatch(/test failure/);
      expect(quoteEl.textContent).toBe('...');
    }));
  });
});
