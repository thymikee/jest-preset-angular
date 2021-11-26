import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

import { getTestHeroes } from './test-heroes';

@Injectable()
export class TestHeroService extends HeroService {
  constructor() {
    super({} as HttpClient);
  }

  heroes = getTestHeroes();
  lastResult!: Observable<any>;

  addHero(hero: Hero): Observable<Hero> {
    throw new Error(`Method not implemented. ${hero}`);
  }

  deleteHero(hero: number | Hero): Observable<Hero> {
    throw new Error(`Method not implemented. ${hero}`);
  }

  getHeroes(): Observable<Hero[]> {
    this.lastResult = new Observable<ReturnType<typeof getTestHeroes>>((observer) => {
      setTimeout(() => {
        observer.next(this.heroes);
        observer.complete();
      }, 0);
    });

    return this.lastResult;
  }

  getHero(id: number | string): Observable<Hero> {
    if (typeof id === 'string') {
      id = parseInt(id, 10);
    }
    const hero = this.heroes.find((h) => h.id === id);
    this.lastResult = new Observable<Hero>((observer) => {
      setTimeout(() => {
        observer.next(hero);
        observer.complete();
      }, 0);
    });

    return this.lastResult;
  }

  updateHero(hero: Hero): Observable<Hero> {
    return (this.lastResult = this.getHero(hero.id).pipe(
      map((h) => {
        if (h) {
          return Object.assign(h, hero);
        }
        throw new Error(`Hero ${hero.id} not found`);
      }),
    ));
  }
}
