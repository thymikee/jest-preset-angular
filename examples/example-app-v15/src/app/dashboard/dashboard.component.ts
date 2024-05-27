import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { sharedImports } from '@shared/shared';

import { DashboardHeroComponent } from './dashboard-hero.component';
import { Hero, HeroService } from '../model';

@Component({
    standalone: true,
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    imports: [DashboardHeroComponent, sharedImports],
})
export class DashboardComponent implements OnInit {
    heroes: Hero[] = [];

    constructor(
        private readonly router: Router,
        private readonly heroService: HeroService,
    ) {}

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
