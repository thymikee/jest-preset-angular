import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleCasePipe } from '@shared/title-case.pipe';

import { Hero } from '../model/hero';

import { HeroDetailService } from './hero-detail.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  standalone: true,
  imports: [TitleCasePipe, FormsModule, NgIf],
  providers: [HeroDetailService],
})
export class HeroDetailComponent implements OnInit {
  constructor(
    private heroDetailService: HeroDetailService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  hero!: Hero;

  ngOnInit(): void {
    this.route.paramMap.subscribe((pmap) => this.getHero(pmap.get('id')));
  }

  private getHero(id: string | null): void {
    if (!id) {
      this.hero = { id: 0, name: '' } as Hero;

      return;
    }

    this.heroDetailService.getHero(id).subscribe((hero) => {
      if (hero) {
        this.hero = hero;
      } else {
        this.gotoList();
      }
    });
  }

  save(): void {
    this.heroDetailService.saveHero(this.hero).subscribe(() => this.gotoList());
  }

  cancel() {
    this.gotoList();
  }

  gotoList() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
