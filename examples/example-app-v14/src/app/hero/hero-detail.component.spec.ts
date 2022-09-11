import { ComponentFixture, fakeAsync, inject, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { jest } from '@jest/globals';
import { firstValueFrom, of } from 'rxjs';

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
    beforeEach(waitForAsync(() => {
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
          jest.spyOn(router, 'navigate').mockImplementation(() => firstValueFrom(of(true)));
        });
    }));

    describe('when navigate to existing hero', () => {
      let expectedHero: Hero;

      beforeEach(waitForAsync(() => {
        expectedHero = firstHero;
        activatedRoute.setParamMap({ id: expectedHero.id });
        fixture = TestBed.createComponent(HeroDetailComponent);
        component = fixture.componentInstance;
        page = new Page(fixture);

        fixture.detectChanges();

        fixture.whenStable().then(() => {
          fixture.detectChanges();
        });
      }));

      it("should display that hero's name", () => {
        expect(page.nameDisplay.textContent).toBe(expectedHero.name);
      });

      it('should navigate when click cancel', () => {
        click(page.cancelBtn);
        expect(page.navigateSpy.mock.calls.length).toBeTruthy();
      });

      it('should save when click save but not navigate immediately', () => {
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
        const hostElement: HTMLElement = fixture.nativeElement;
        const nameInput = hostElement.querySelector('input');
        const nameDisplay = hostElement.querySelector('span');

        if (nameInput !== null) {
          nameInput.value = 'quick BROWN  fOx';

          nameInput.dispatchEvent(new Event('input'));
        }

        fixture.detectChanges();

        expect(nameDisplay?.textContent).toBe('Quick Brown  Fox');
      });
    });

    describe('when navigate with no hero id', () => {
      beforeEach(waitForAsync(() => {
        fixture = TestBed.createComponent(HeroDetailComponent);
        component = fixture.componentInstance;
        page = new Page(fixture);

        fixture.detectChanges();

        fixture.whenStable().then(() => {
          fixture.detectChanges();
        });
      }));

      it('should have hero.id === 0', () => {
        expect(component.hero.id).toBe(0);
      });

      it('should display empty hero name', () => {
        expect(page.nameDisplay.textContent).toBe('');
      });
    });

    describe('when navigate to non-existent hero id', () => {
      beforeEach(waitForAsync(() => {
        activatedRoute.setParamMap({ id: 99999 });
        fixture = TestBed.createComponent(HeroDetailComponent);
        component = fixture.componentInstance;
        page = new Page(fixture);

        fixture.detectChanges();

        fixture.whenStable().then(() => {
          fixture.detectChanges();
        });
      }));

      it('should try to navigate back to hero list', () => {
        expect(page.gotoListSpy.mock.calls.length).toBeTruthy();
        expect(page.navigateSpy.mock.calls.length).toBeTruthy();
      });
    });

    it("cannot use `inject` to get component's provided HeroDetailService", () => {
      let service: HeroDetailService;
      fixture = TestBed.createComponent(HeroDetailComponent);
      expect(inject([HeroDetailService], (hds: HeroDetailService) => (service = hds))).toThrow(
        /No provider for HeroDetailService/,
      );

      service = fixture.debugElement.injector.get(HeroDetailService);
      expect(service).toBeDefined();
    });
  });

  describe('when override its provided HeroDetailService', () => {
    class HeroDetailServiceMock {
      testHero: Hero = { id: 42, name: 'Test Hero' };

      getHero = () => of({ ...this.testHero });

      saveHero = (hero: Hero) => of(Object.assign(this.testHero, hero));
    }

    let heroDetailsService: HeroDetailServiceMock;

    let hdsSpy: {
      getHero: ReturnType<typeof jest.spyOn>;
      saveHero: ReturnType<typeof jest.spyOn>;
    };

    beforeEach(waitForAsync(() => {
      void TestBed.configureTestingModule({
        imports: [HeroModule, RouterTestingModule],
        providers: [
          { provide: ActivatedRoute, useValue: activatedRoute },
          { provide: HeroDetailService, useValue: {} },
        ],
      })
        .overrideComponent(HeroDetailComponent, {
          set: { providers: [{ provide: HeroDetailService, useClass: HeroDetailServiceMock }] },
        })
        .compileComponents()
        .then(() => {
          const router = TestBed.inject(Router);
          jest.spyOn(router, 'navigate').mockImplementation(() => firstValueFrom(of(true)));

          activatedRoute.setParamMap({ id: 99999 });

          fixture = TestBed.createComponent(HeroDetailComponent);
          component = fixture.componentInstance;
          page = new Page(fixture);

          heroDetailsService = fixture.debugElement.injector.get(HeroDetailService) as unknown as HeroDetailServiceMock;

          hdsSpy = {
            getHero: jest.spyOn(heroDetailsService, 'getHero'),
            saveHero: jest.spyOn(heroDetailsService, 'saveHero'),
          };

          fixture.detectChanges();

          fixture.whenStable().then(() => {
            fixture.detectChanges();
          });
        });
    }));

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

      page.nameInput.dispatchEvent(new Event('input'));

      expect(component.hero.name).toBe(newName);
      expect(heroDetailsService.testHero.name).toBe(origName);

      click(page.saveBtn);
      expect(hdsSpy.saveHero.mock.calls.length).toBe(1);

      tick();
      expect(heroDetailsService.testHero.name).toBe(newName);
      expect(page.navigateSpy.mock.calls.length).toBeTruthy();
    }));

    it('fixture injected service is not the component injected service', inject(
      [HeroDetailService],
      (fixtureService: HeroDetailService) => {
        const componentService = fixture.debugElement.injector.get(HeroDetailService);

        expect(fixtureService).not.toBe(componentService);
      },
    ));
  });

  describe('with FormsModule setup', () => {
    beforeEach(waitForAsync(() => {
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
          jest.spyOn(router, 'navigate').mockImplementation(() => firstValueFrom(of(true)));
        });
    }));

    it("formsModuleSetup: should display 1st hero's name", waitForAsync(() => {
      const expectedHero = firstHero;
      activatedRoute.setParamMap({ id: expectedHero.id });
      fixture = TestBed.createComponent(HeroDetailComponent);
      component = fixture.componentInstance;
      page = new Page(fixture);

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(page.nameDisplay.textContent).toBe(expectedHero.name);
      });
    }));
  });

  describe('with SharedModule setup', () => {
    beforeEach(waitForAsync(() => {
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
          jest.spyOn(router, 'navigate').mockImplementation(() => firstValueFrom(of(true)));
        });
    }));

    it("sharedModuleSetup: should display 1st hero's name", waitForAsync(() => {
      const expectedHero = firstHero;
      activatedRoute.setParamMap({ id: expectedHero.id });
      fixture = TestBed.createComponent(HeroDetailComponent);
      component = fixture.componentInstance;
      page = new Page(fixture);

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(page.nameDisplay.textContent).toBe(expectedHero.name);
      });
    }));
  });
});

class Page {
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
  navigateSpy: ReturnType<typeof jest.spyOn>;

  constructor(someFixture: ComponentFixture<HeroDetailComponent>) {
    const routerSpy = someFixture.debugElement.injector.get(Router) as unknown as {
      navigate: ReturnType<typeof jest.spyOn>;
    };
    this.navigateSpy = routerSpy.navigate;

    const someComponent = someFixture.componentInstance;
    this.gotoListSpy = jest.spyOn(someComponent, 'gotoList');
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }

  private queryAll<T>(selector: string): T[] {
    return fixture.nativeElement.querySelectorAll(selector);
  }
}
