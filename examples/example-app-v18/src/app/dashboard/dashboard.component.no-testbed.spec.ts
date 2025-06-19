import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { Hero } from '../model';
import { HeroService } from '../model/hero.service';
import { TestHeroService } from '../model/testing';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent class only (Jest version)', () => {
    let fixture: ComponentFixture<DashboardComponent>;
    let comp: DashboardComponent;
    let heroService: jest.Mocked<TestHeroService>;
    let router: jest.Mocked<Router>;

    beforeEach(async () => {
        const routerMock: jest.Mocked<Router> = {
            navigateByUrl: jest.fn(),
        } as unknown as jest.Mocked<Router>;

        const heroServiceMock: jest.Mocked<TestHeroService> = {
            getHeroes: jest.fn(),
            lastHeroesResult: of([]),
        } as unknown as jest.Mocked<TestHeroService>;

        await TestBed.configureTestingModule({
            imports: [DashboardComponent],
            providers: [
                { provide: Router, useValue: routerMock },
                { provide: HeroService, useValue: heroServiceMock },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(DashboardComponent);
        comp = fixture.componentInstance;

        router = TestBed.inject(Router) as jest.Mocked<Router>;
        heroService = TestBed.inject(HeroService) as jest.Mocked<TestHeroService>;
    });

    it('should NOT have heroes before calling OnInit', () => {
        expect(comp.heroes.length).toBe(0);
    });

    it('should HAVE heroes after HeroService gets them', waitForAsync(() => {
        comp.ngOnInit();
        heroService.lastHeroesResult?.subscribe(() => {
            expect(comp.heroes.length).toBeGreaterThan(0);
        });
    }));

    it('should tell ROUTER to navigate by hero id', () => {
        const hero: Hero = { id: 42, name: 'Abbracadabra' };
        const spy = jest.spyOn(router, 'navigateByUrl');

        comp.gotoDetail(hero);

        const navArgs = spy.mock.calls[0][0];
        expect(navArgs).toBe('/heroes/42');
    });
});
