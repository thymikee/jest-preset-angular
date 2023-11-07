import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '../model/hero';
import { HeroService } from '../model/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(
    private router: Router,
    private heroService: HeroService,
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
