import { ComponentFixture, fakeAsync, inject, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { jest } from '@jest/globals';
import { of } from 'rxjs';

import { ActivatedRoute, ActivatedRouteStub, click } from '../../testing';
import { Hero } from '../model/hero';
import { HeroService } from '../model/hero.service';
import { TestHeroService } from '../model/testing/test-hero.service';
import { getTestHeroes } from '../model/testing/test-heroes';
import { SharedModule } from '../shared/shared.module';
import { TitleCasePipe } from '../shared/title-case.pipe';

import { HeroDetailComponent } from './hero-detail.component';
import { HeroDetailService } from './hero-detail.service';
import { HeroModule } from './hero.module';

let activatedRoute: ActivatedRouteStub;
let component: HeroDetailComponent;
let fixture: ComponentFixture<HeroDetailComponent>;
let page: Page;

const firstHero = getTestHeroes()[0];

describe('HeroDetailComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });

  describe('with HeroModule setup', () => {
    beforeEach(
      waitForAsync(() => {
        void TestBed.configureTestingModule({
          imports: [HeroModule, RouterTestingModule],
          providers: [
            { provide: ActivatedRoute, useValue: activatedRoute },
            { provide: HeroService, useClass: TestHeroService },
          ],
        })
          .compileComponents()
          .then(() => {
            const router = TestBed.inject(Router);
            jest.spyOn(router, 'navigate').mockImplementation(() => of(true).toPromise());
          });
      }),
    );

    describe('when navigate to existing hero', () => {
      let expectedHero: Hero;

      beforeEach(
        waitForAsync(() => {
          expectedHero = firstHero;
          activatedRoute.setParamMap({ id: expectedHero.id });
          fixture = TestBed.createComponent(HeroDetailComponent);
          component = fixture.componentInstance;
          page = new Page(fixture);

          // 1st change detection triggers ngOnInit which gets a hero
          fixture.detectChanges();

          fixture.whenStable().then(() => {
            // 2nd change detection displays the async-fetched hero
            fixture.detectChanges();
          });
        }),
      );

      it("should display that hero's name", () => {
        expect(page.nameDisplay.textContent).toBe(expectedHero.name);
      });

      it('should navigate when click cancel', () => {
        click(page.cancelBtn);
        expect(page.navigateSpy.mock.calls.length).toBeTruthy();
      });

      it('should save when click save but not navigate immediately', () => {
        // Get service injected into component and spy on its`saveHero` method.
        // It delegates to fake `HeroService.updateHero` which delivers a safe test result.
        const hds = fixture.debugElement.injector.get(HeroDetailService);
        const saveSpy = jest.spyOn(hds, 'saveHero');

        click(page.saveBtn);
        expect(saveSpy.mock.calls.length).toBeTruthy();
        expect(page.navigateSpy.mock.calls.length).toBeFalsy();
      });

      it('should navigate when click save and save resolves', fakeAsync(() => {
        click(page.saveBtn);
        tick();
        expect(page.navigateSpy.mock.calls.length).toBeTruthy();
      }));

      it('should convert hero name to Title Case', () => {
        // get the name's input and display elements from the DOM
        const hostElement: HTMLElement = fixture.nativeElement;
        const nameInput: HTMLInputElement = hostElement.querySelector('input')!;
        const nameDisplay: HTMLElement = hostElement.querySelector('span')!;

        // simulate user entering a new name into the input box
        nameInput.value = 'quick BROWN  fOx';

        // Dispatch a DOM event so that Angular learns of input value change.
        // In older browsers, such as IE, you might need a CustomEvent instead. See
        // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
        nameInput.dispatchEvent(new Event('input'));

        // Tell Angular to update the display binding through the title pipe
        fixture.detectChanges();

        expect(nameDisplay.textContent).toBe('Quick Brown  Fox');
      });
    });

    describe('when navigate with no hero id', () => {
      beforeEach(
        waitForAsync(() => {
          fixture = TestBed.createComponent(HeroDetailComponent);
          component = fixture.componentInstance;
          page = new Page(fixture);

          // 1st change detection triggers ngOnInit which gets a hero
          fixture.detectChanges();

          fixture.whenStable().then(() => {
            // 2nd change detection displays the async-fetched hero
            fixture.detectChanges();
          });
        }),
      );

      it('should have hero.id === 0', () => {
        expect(component.hero.id).toBe(0);
      });

      it('should display empty hero name', () => {
        expect(page.nameDisplay.textContent).toBe('');
      });
    });

    describe('when navigate to non-existent hero id', () => {
      beforeEach(
        waitForAsync(() => {
          activatedRoute.setParamMap({ id: 99999 });
          fixture = TestBed.createComponent(HeroDetailComponent);
          component = fixture.componentInstance;
          page = new Page(fixture);

          // 1st change detection triggers ngOnInit which gets a hero
          fixture.detectChanges();

          fixture.whenStable().then(() => {
            // 2nd change detection displays the async-fetched hero
            fixture.detectChanges();
          });
        }),
      );

      it('should try to navigate back to hero list', () => {
        expect(page.gotoListSpy.mock.calls.length).toBeTruthy();
        expect(page.navigateSpy.mock.calls.length).toBeTruthy();
      });
    });

    // Why we must use `fixture.debugElement.injector` in `Page()`
    it("cannot use `inject` to get component's provided HeroDetailService", () => {
      let service: HeroDetailService;
      fixture = TestBed.createComponent(HeroDetailComponent);
      expect(
        // Throws because `inject` only has access to TestBed's injector
        // which is an ancestor of the component's injector
        inject([HeroDetailService], (hds: HeroDetailService) => (service = hds)),
      ).toThrowError(/No provider for HeroDetailService/);

      // get `HeroDetailService` with component's own injector
      service = fixture.debugElement.injector.get(HeroDetailService);
      expect(service).toBeDefined();
    });
  });

  describe('when override its provided HeroDetailService', () => {
    class HeroDetailServiceMock {
      testHero: Hero = { id: 42, name: 'Test Hero' };

      /* emit cloned test hero */
      getHero = () => of({ ...this.testHero });

      /* emit clone of test hero, with changes merged in */
      saveHero = (hero: Hero) => of(Object.assign(this.testHero, hero));
    }

    let heroDetailsService: HeroDetailServiceMock;

    let hdsSpy: {
      getHero: ReturnType<typeof jest.spyOn>;
      saveHero: ReturnType<typeof jest.spyOn>;
    };

    beforeEach(
      waitForAsync(() => {
        void TestBed.configureTestingModule({
          imports: [HeroModule, RouterTestingModule],
          providers: [
            { provide: ActivatedRoute, useValue: activatedRoute },
            // HeroDetailService at this level is IRRELEVANT!
            { provide: HeroDetailService, useValue: {} },
          ],
        })
          .overrideComponent(HeroDetailComponent, {
            set: { providers: [{ provide: HeroDetailService, useClass: HeroDetailServiceMock }] },
          })
          .compileComponents()
          .then(() => {
            const router = TestBed.inject(Router);
            jest.spyOn(router, 'navigate').mockImplementation(() => of(true).toPromise());

            activatedRoute.setParamMap({ id: 99999 });

            fixture = TestBed.createComponent(HeroDetailComponent);
            component = fixture.componentInstance;
            page = new Page(fixture);

            heroDetailsService = fixture.debugElement.injector.get(
              HeroDetailService,
            ) as unknown as HeroDetailServiceMock;

            hdsSpy = {
              getHero: jest.spyOn(heroDetailsService, 'getHero'),
              saveHero: jest.spyOn(heroDetailsService, 'saveHero'),
            };

            // 1st change detection triggers ngOnInit which gets a hero
            fixture.detectChanges();

            fixture.whenStable().then(() => {
              // 2nd change detection displays the async-fetched hero
              fixture.detectChanges();
            });
          });
      }),
    );

    it('should have called `getHero`', () => {
      expect(hdsSpy.getHero.mock.calls.length).toEqual(1);
    });

    it("should display stub hero's name", () => {
      expect(page.nameDisplay.textContent).toBe(heroDetailsService.testHero.name);
    });

    it('should save stub hero change', fakeAsync(() => {
      const origName = heroDetailsService.testHero.name;
      const newName = 'New Name';

      page.nameInput.value = newName;

      // In older browsers, such as IE, you might need a CustomEvent instead. See
      // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
      page.nameInput.dispatchEvent(new Event('input')); // tell Angular

      expect(component.hero.name).toBe(newName);
      expect(heroDetailsService.testHero.name).toBe(origName);

      click(page.saveBtn);
      expect(hdsSpy.saveHero.mock.calls.length).toBe(1);

      tick(); // wait for async save to complete
      expect(heroDetailsService.testHero.name).toBe(newName);
      expect(page.navigateSpy.mock.calls.length).toBeTruthy();
    }));

    it('fixture injected service is not the component injected service', inject(
      // inject gets the service from the fixture
      [HeroDetailService],
      (fixtureService: HeroDetailService) => {
        // use `fixture.debugElement.injector` to get service from component
        const componentService = fixture.debugElement.injector.get(HeroDetailService);

        expect(fixtureService).not.toBe(componentService);
      },
    ));
  });

  describe('with FormsModule setup', () => {
    beforeEach(
      waitForAsync(() => {
        void TestBed.configureTestingModule({
          imports: [FormsModule, RouterTestingModule],
          declarations: [HeroDetailComponent, TitleCasePipe],
          providers: [
            { provide: ActivatedRoute, useValue: activatedRoute },
            { provide: HeroService, useClass: TestHeroService },
          ],
        })
          .compileComponents()
          .then(() => {
            const router = TestBed.inject(Router);
            jest.spyOn(router, 'navigate').mockImplementation(() => of(true).toPromise());
          });
      }),
    );

    it(
      "formsModuleSetup: should display 1st hero's name",
      waitForAsync(() => {
        const expectedHero = firstHero;
        activatedRoute.setParamMap({ id: expectedHero.id });
        fixture = TestBed.createComponent(HeroDetailComponent);
        component = fixture.componentInstance;
        page = new Page(fixture);

        // 1st change detection triggers ngOnInit which gets a hero
        fixture.detectChanges();

        fixture.whenStable().then(() => {
          // 2nd change detection displays the async-fetched hero
          fixture.detectChanges();
          expect(page.nameDisplay.textContent).toBe(expectedHero.name);
        });
      }),
    );
  });

  describe('with SharedModule setup', () => {
    beforeEach(
      waitForAsync(() => {
        void TestBed.configureTestingModule({
          imports: [SharedModule, RouterTestingModule],
          declarations: [HeroDetailComponent],
          providers: [
            { provide: ActivatedRoute, useValue: activatedRoute },
            { provide: HeroService, useClass: TestHeroService },
          ],
        })
          .compileComponents()
          .then(() => {
            const router = TestBed.inject(Router);
            jest.spyOn(router, 'navigate').mockImplementation(() => of(true).toPromise());
          });
      }),
    );

    it(
      "sharedModuleSetup: should display 1st hero's name",
      waitForAsync(() => {
        const expectedHero = firstHero;
        activatedRoute.setParamMap({ id: expectedHero.id });
        fixture = TestBed.createComponent(HeroDetailComponent);
        component = fixture.componentInstance;
        page = new Page(fixture);

        // 1st change detection triggers ngOnInit which gets a hero
        fixture.detectChanges();

        fixture.whenStable().then(() => {
          // 2nd change detection displays the async-fetched hero
          fixture.detectChanges();
          expect(page.nameDisplay.textContent).toBe(expectedHero.name);
        });
      }),
    );
  });
});

/////////// Helpers /////

class Page {
  // getter properties wait to query the DOM until called.
  get buttons() {
    return this.queryAll<HTMLButtonElement>('button');
  }
  get saveBtn() {
    return this.buttons[0];
  }
  get cancelBtn() {
    return this.buttons[1];
  }
  get nameDisplay() {
    return this.query<HTMLElement>('span');
  }
  get nameInput() {
    return this.query<HTMLInputElement>('input');
  }

  gotoListSpy: ReturnType<typeof jest.spyOn>;
  navigateSpy: jest.SpyInstance;

  constructor(someFixture: ComponentFixture<HeroDetailComponent>) {
    // get the navigate spy from the injected router spy object
    const routerSpy = someFixture.debugElement.injector.get(Router) as any;
    this.navigateSpy = routerSpy.navigate;

    // spy on component's `gotoList()` method
    const someComponent = someFixture.componentInstance;
    this.gotoListSpy = jest.spyOn(someComponent, 'gotoList');
  }

  //// query helpers ////
  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }

  private queryAll<T>(selector: string): T[] {
    return fixture.nativeElement.querySelectorAll(selector);
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
