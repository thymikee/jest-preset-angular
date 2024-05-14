import { Routes } from '@angular/router';

import { HeroDetailComponent } from './hero-detail.component';
import { HeroListComponent } from './hero-list.component';

export default [
  { path: '', component: HeroListComponent },
  { path: ':id', component: HeroDetailComponent },
] as Routes;
