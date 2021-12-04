import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Hero } from '../model/hero';
import { HeroService } from '../model/hero.service';

@Injectable()
export class HeroDetailService {
  constructor(private heroService: HeroService) {}

  getHero(id: number | string): Observable<Hero | null> {
    if (typeof id === 'string') {
      id = parseInt(id, 10);
    }

    return this.heroService.getHero(id).pipe(
      map((hero) => {
        return hero ? { ...hero } : null; // clone or null
      }),
    );
  }

  saveHero(hero: Hero) {
    return this.heroService.updateHero(hero);
  }
}
