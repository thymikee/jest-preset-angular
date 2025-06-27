import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { sharedImports } from '@shared/shared';

import { Hero, HeroService } from '../model';

import { DashboardHeroComponent } from './dashboard-hero.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    imports: [DashboardHeroComponent, sharedImports],
})
export class DashboardComponent implements OnInit {
    private readonly router = inject(Router);
    private readonly heroService = inject(HeroService);

    heroes: Hero[] = [];

    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);

    constructor() {}

    ngOnInit() {
        this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes.slice(1, 5)));
    }

    gotoDetail(hero: Hero) {
        const url = `/heroes/${hero.id}`;
        this.router.navigateByUrl(url);
    }

    get title() {
        const cnt = this.heroes.length;

        return cnt === 0 ? 'No Heroes' : cnt === 1 ? 'Top Hero' : `Top ${cnt} Heroes`;
    }
}
