import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { sharedImports } from '@shared/shared';

import { Hero } from '../model';

import { HeroDetailService } from './hero-detail.service';

@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css'],
    providers: [HeroDetailService],
    imports: [sharedImports, RouterLink],
})
export class HeroDetailComponent implements OnInit {
    private readonly heroDetailService = inject(HeroDetailService);
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);

    hero!: Hero;

    ngOnInit(): void {
        // get hero when `id` param changes
        this.route.paramMap.subscribe((pmap) => this.getHero(pmap.get('id')));
    }

    private getHero(id: string | null): void {
        // when no id or id===0, create new blank hero
        if (!id) {
            this.hero = { id: 0, name: '' } as Hero;

            return;
        }

        this.heroDetailService.getHero(id).subscribe((hero) => {
            if (hero) {
                this.hero = hero;
            } else {
                this.gotoList(); // id not found; navigate to list
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
