import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { sharedImports } from '@shared/shared';
import { Observable } from 'rxjs';

import { Hero, HeroService } from '../model';

@Component({
    selector: 'app-heroes',
    templateUrl: './hero-list.component.html',
    styleUrls: ['./hero-list.component.css'],
    imports: [AsyncPipe, sharedImports],
})
export class HeroListComponent {
    heroes: Observable<Hero[]>;
    selectedHero!: Hero;

    private readonly router = inject(Router);
    private readonly heroService = inject(HeroService);

    onSelect(hero: Hero) {
        this.selectedHero = hero;
        this.router.navigate(['../heroes', this.selectedHero.id]);
    }
}
