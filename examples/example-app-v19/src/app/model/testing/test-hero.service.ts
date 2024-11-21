import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { getTestHeroes } from './test-heroes';
import { asyncData } from '../../../testing';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Injectable()
export class TestHeroService extends HeroService {
    constructor() {
        super(null!);
    }

    heroes = getTestHeroes();
    lastHeroResult?: Observable<Hero | undefined>;
    lastHeroesResult?: Observable<Hero[]>;

    override addHero(hero: Hero): Observable<Hero> {
        throw new Error(`Method not implemented. ${hero}`);
    }

    override deleteHero(hero: number | Hero): Observable<Hero> {
        throw new Error(`Method not implemented. ${hero}`);
    }

    override getHeroes(): Observable<Hero[]> {
        this.lastHeroesResult = asyncData(this.heroes);

        return this.lastHeroesResult;
    }

    override getHero(id: number | string): Observable<Hero | undefined> {
        if (typeof id === 'string') {
            id = parseInt(id, 10);
        }
        const hero = this.heroes.find((h) => h.id === id);
        this.lastHeroResult = asyncData(hero);

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
