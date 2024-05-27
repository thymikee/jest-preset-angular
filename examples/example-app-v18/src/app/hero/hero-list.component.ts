import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { sharedImports } from '@shared/shared';
import { Observable } from 'rxjs';

import { Hero, HeroService } from '../model';

@Component({
    standalone: true,
    selector: 'app-heroes',
    templateUrl: './hero-list.component.html',
    styleUrls: ['./hero-list.component.css'],
    imports: [AsyncPipe, sharedImports],
})
export class HeroListComponent {
    heroes: Observable<Hero[]>;
    selectedHero!: Hero;

    constructor(
        private readonly router: Router,
        private readonly heroService: HeroService,
    ) {
        this.heroes = this.heroService.getHeroes();
    }

    onSelect(hero: Hero) {
        this.selectedHero = hero;
        this.router.navigate(['../heroes', this.selectedHero.id]);
    }
}
