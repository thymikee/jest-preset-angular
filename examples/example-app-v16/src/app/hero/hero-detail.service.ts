import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Hero, HeroService } from '../model';

@Injectable({ providedIn: 'root' })
export class HeroDetailService {
    constructor(private readonly heroService: HeroService) {}

    // Returns a clone which caller may modify safely
    getHero(id: number | string): Observable<Hero | null> {
        if (typeof id === 'string') {
            id = parseInt(id, 10);
        }

        return this.heroService.getHero(id).pipe(
            map((hero) => (hero ? { ...hero } : null)), // clone or null
        );
    }

    saveHero(hero: Hero) {
        return this.heroService.updateHero(hero);
    }
}
