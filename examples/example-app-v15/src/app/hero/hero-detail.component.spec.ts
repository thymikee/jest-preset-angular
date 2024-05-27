import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { jest } from '@jest/globals';
import { sharedImports } from '@shared/shared';
import { TitleCasePipe } from '@shared/title-case.pipe';
import { of } from 'rxjs';

import { HeroDetailComponent } from './hero-detail.component';
import { HeroDetailService } from './hero-detail.service';
import { HeroListComponent } from './hero-list.component';
import { click } from '../../testing';
import { appConfig } from '../app.config';
import { Hero } from '../model';
import { getTestHeroes } from '../model/testing/test-heroes';

let component: HeroDetailComponent;
let page: Page;
let harness: RouterTestingHarness;

describe('HeroDetailComponent', () => {
    const firstHero = getTestHeroes()[0];
    const createComponent = async (id: number) => {
        harness = await RouterTestingHarness.create();
        component = await harness.navigateByUrl(`/heroes/${id}`, HeroDetailComponent);
        page = new Page();

        const request = TestBed.inject(HttpTestingController).expectOne(`api/heroes/?id=${id}`);
        const hero = getTestHeroes().find((h) => h.id === Number(id));
        request.flush(hero ? [hero] : []);
        harness.detectChanges();
    };

    describe('with HeroModule setup', () => {
        beforeEach(waitForAsync(async () => {
            await TestBed.configureTestingModule({
                ...appConfig,
                imports: [HeroListComponent, HeroDetailComponent],
                providers: [
                    provideRouter([
                        { path: 'heroes', component: HeroListComponent },
                        { path: 'heroes/:id', component: HeroDetailComponent },
                    ]),
                    provideHttpClient(),
                    provideHttpClientTesting(),
                ],
            }).compileComponents();
        }));

        describe('when navigate to existing hero', () => {
            let expectedHero: Hero;

            beforeEach(waitForAsync(async () => {
                expectedHero = firstHero;
                await createComponent(expectedHero.id);
            }));

            it("should display that hero's name", () => {
                expect(page.nameDisplay.textContent).toBe(expectedHero.name);
            });

            it('should navigate when click cancel', () => {
                click(page.cancelBtn);

                expect(TestBed.inject(Router).url).toEqual('/heroes');
            });

            it('should save when click save but not navigate immediately', () => {
                click(page.saveBtn);

                expect(
                    TestBed.inject(HttpTestingController).expectOne({ method: 'PUT', url: 'api/heroes' }),
                ).toBeTruthy();
                expect(TestBed.inject(Router).url).toEqual('/heroes/41');
            });

            it('should navigate when click save and save resolves', fakeAsync(() => {
                click(page.saveBtn);
                tick();

                expect(TestBed.inject(Router).url).toEqual(`/heroes/${firstHero.id}`);
            }));

            it('should convert hero name to Title Case', () => {
                const hostElement: HTMLElement = harness.routeNativeElement!;
                const nameInput: HTMLInputElement = hostElement.querySelector('input')!;
                const nameDisplay: HTMLElement = hostElement.querySelector('span')!;

                nameInput.value = 'quick BROWN  fOx';
                nameInput.dispatchEvent(new Event('input'));
                harness.detectChanges();

                expect(nameDisplay.textContent).toBe('Quick Brown  Fox');
            });
        });

        describe('when navigate to non-existent hero id', () => {
            beforeEach(waitForAsync(async () => {
                await createComponent(999);
            }));

            it('should try to navigate back to hero list', () => {
                expect(TestBed.inject(Router).url).toEqual('/heroes');
            });
        });
    });

    describe('when override its provided HeroDetailService', () => {
        const testHero = getTestHeroes()[0];
        class HeroDetailServiceSpy {
            testHero = { ...testHero };

            getHero = jest.fn().mockReturnValue(of({ ...this.testHero }));

            saveHero = jest.fn((hero: Hero) => of(Object.assign(this.testHero, hero)));
        }
        let hdsSpy: HeroDetailServiceSpy;

        beforeEach(waitForAsync(async () => {
            await TestBed.configureTestingModule({
                ...appConfig,
                imports: [HeroDetailComponent, HeroListComponent],
                providers: [
                    provideRouter([
                        { path: 'heroes', component: HeroListComponent },
                        { path: 'heroes/:id', component: HeroDetailComponent },
                    ]),
                    provideHttpClient(),
                    provideHttpClientTesting(),
                    { provide: HeroDetailService, useValue: {} },
                ],
            })
                .overrideComponent(HeroDetailComponent, {
                    set: { providers: [{ provide: HeroDetailService, useClass: HeroDetailServiceSpy }] },
                })
                .compileComponents();
            harness = await RouterTestingHarness.create();
            component = await harness.navigateByUrl(`/heroes/${testHero.id}`, HeroDetailComponent);
            page = new Page();
            hdsSpy = harness.routeDebugElement!.injector.get(HeroDetailService) as unknown as HeroDetailServiceSpy;

            harness.detectChanges();
        }));

        it('should have called `getHero`', () => {
            expect(hdsSpy.getHero).toHaveBeenCalledTimes(1);
        });

        it("should display stub hero's name", () => {
            expect(page.nameDisplay.textContent).toBe(hdsSpy.testHero.name);
        });

        it('should save stub hero change', fakeAsync(() => {
            const origName = hdsSpy.testHero.name;
            const newName = 'New Name';

            page.nameInput.value = newName;
            page.nameInput.dispatchEvent(new Event('input'));

            expect(component.hero.name).toBe(newName);
            expect(hdsSpy.testHero.name).toBe(origName);

            click(page.saveBtn);

            expect(hdsSpy.saveHero).toHaveBeenCalledTimes(1);

            tick();

            expect(hdsSpy.testHero.name).toBe(newName);
            expect(TestBed.inject(Router).url).toEqual('/heroes');
        }));
    });

    describe('with FormsModule setup', () => {
        beforeEach(waitForAsync(async () => {
            await TestBed.configureTestingModule({
                ...appConfig,
                imports: [FormsModule, HeroDetailComponent, TitleCasePipe],
                providers: [
                    provideHttpClient(),
                    provideHttpClientTesting(),
                    provideRouter([{ path: 'heroes/:id', component: HeroDetailComponent }]),
                ],
            }).compileComponents();
        }));

        it("should display 1st hero's name", async () => {
            const expectedHero = firstHero;
            await createComponent(expectedHero.id);

            expect(page.nameDisplay.textContent).toBe(expectedHero.name);
        });
    });

    describe('with SharedModule setup', () => {
        beforeEach(waitForAsync(async () => {
            await TestBed.configureTestingModule({
                ...appConfig,
                imports: [HeroDetailComponent, sharedImports],
                providers: [
                    provideRouter([{ path: 'heroes/:id', component: HeroDetailComponent }]),
                    provideHttpClient(),
                    provideHttpClientTesting(),
                ],
            }).compileComponents();
        }));

        it("should display 1st hero's name", async () => {
            const expectedHero = firstHero;
            await createComponent(expectedHero.id);

            expect(page.nameDisplay.textContent).toBe(expectedHero.name);
        });
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

    private query<T>(selector: string): T {
        return harness.routeNativeElement?.querySelector(selector) as T;
    }

    private queryAll<T>(selector: string): T[] {
        return (harness.routeNativeElement?.querySelectorAll(selector) ?? []) as T[];
    }
}
