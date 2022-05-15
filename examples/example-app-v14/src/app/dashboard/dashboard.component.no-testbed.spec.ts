import { waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { jest } from '@jest/globals';

import { Hero } from '../model/hero';
import { TestHeroService } from '../model/testing/test-hero.service';

import { DashboardComponent } from './dashboard.component';

class FakeRouter {
  navigateByUrl(url: string) {
    return url;
  }
}

describe('DashboardComponent class only', () => {
  let comp: DashboardComponent;
  let heroService: TestHeroService;
  let router: Router;

  beforeEach(() => {
    router = new FakeRouter() as unknown as Router;
    heroService = new TestHeroService();
    comp = new DashboardComponent(router, heroService);
  });

  it('should NOT have heroes before calling OnInit', () => {
    expect(comp.heroes.length).toEqual(0);
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
