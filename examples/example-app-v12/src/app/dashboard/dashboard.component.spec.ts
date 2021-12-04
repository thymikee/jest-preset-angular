import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { jest } from '@jest/globals';
import { of } from 'rxjs';

import { click } from '../../testing';
import { HeroService } from '../model/hero.service';
import { getTestHeroes } from '../model/testing/test-heroes';

import { DashboardHeroComponent } from './dashboard-hero.component';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent (deep)', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let component: DashboardComponent;
  let router: Router;
  let spy: ReturnType<typeof jest.spyOn>;

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule({
        imports: [CommonModule, FormsModule, RouterTestingModule],
        declarations: [DashboardComponent, DashboardHeroComponent],
        providers: [
          {
            provide: HeroService,
            useValue: {
              getHeroes: () => of(getTestHeroes()),
            },
          },
        ],
        schemas: [NO_ERRORS_SCHEMA],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(DashboardComponent);
          component = fixture.componentInstance;
          router = TestBed.inject(Router);
          spy = jest.spyOn(router, 'navigateByUrl');
          spy.mockImplementation(() => of(true).toPromise());
        });
    }),
  );

  it('should not have heroes before ngOnInit', () => {
    expect(component.heroes.length).toEqual(0);
  });

  describe('after get dashboard heroes (deep)', () => {
    beforeEach(
      waitForAsync(() => {
        fixture.detectChanges();
      }),
    );

    it('should have heroes', () => {
      expect(component.heroes.length).toBeGreaterThan(0);
    });

    it('should display heroes', () => {
      const heroes = fixture.nativeElement.querySelectorAll('dashboard-hero');
      expect(heroes.length).toEqual(4);
    });

    it('should tell the router to navigate when hero clicked', () => {
      const heroEl: HTMLElement = fixture.nativeElement.querySelector('.hero');
      click(heroEl);

      const navArgs = spy.mock.calls[0];

      const id = component.heroes[0].id;
      expect(navArgs).toEqual(['/heroes/' + id]);
    });
  });

  describe('after get dashboard heroes (shallow)', () => {
    beforeEach(
      waitForAsync(() => {
        fixture.detectChanges();
      }),
    );

    it('should have heroes', () => {
      expect(component.heroes.length).toBeGreaterThan(0);
    });

    it('should display heroes', () => {
      const heroes = fixture.nativeElement.querySelectorAll('dashboard-hero');
      expect(heroes.length).toEqual(4);
    });

    it('should tell the router to navigate when hero clicked', () => {
      const heroDe = fixture.debugElement.query(By.css('dashboard-hero'));
      heroDe.triggerEventHandler('selected', component.heroes[0]);

      const navArgs = spy.mock.calls[0][0];

      const id = component.heroes[0].id;
      expect(navArgs).toEqual('/heroes/' + id);
    });
  });
});
