import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Hero } from '../model/hero';
import { HeroService } from '../model/hero.service';

@Injectable()
export class HeroDetailService {
  constructor(private heroService: HeroService) {}

  // Returns a clone which caller may modify safely
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

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
