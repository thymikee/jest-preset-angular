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
  lastHeroResult?: Observable<Hero>;
  lastHeroesResult?: Observable<Hero[]>;

  override addHero(hero: Hero): Observable<Hero> {
    throw new Error(`Method not implemented. ${hero}`);
  }

  override deleteHero(hero: number | Hero): Observable<Hero> {
    throw new Error(`Method not implemented. ${hero}`);
  }

  override getHeroes(): Observable<Hero[]> {
    this.lastHeroesResult = new Observable<ReturnType<typeof getTestHeroes>>((observer) => {
      setTimeout(() => {
        observer.next(this.heroes);
        observer.complete();
      }, 0);
    });

    return this.lastHeroesResult;
  }

  override getHero(id: number | string): Observable<Hero> {
    if (typeof id === 'string') {
      id = parseInt(id, 10);
    }
    const hero = this.heroes.find((h) => h.id === id);
    this.lastHeroResult = new Observable<Hero>((observer) => {
      setTimeout(() => {
        observer.next(hero);
        observer.complete();
      }, 0);
    });

    return this.lastHeroResult;
  }

  override updateHero(hero: Hero): Observable<Hero> {
    return (this.lastHeroResult = this.getHero(hero.id).pipe(
      map((h) => {
        if (h) {
          return Object.assign(h, hero);
        }
        throw new Error(`Hero ${hero.id} not found`);
      }),
    ));
  }
}
