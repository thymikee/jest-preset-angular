import { Routes } from '@angular/router';

import { HeroDetailComponent } from './hero-detail.component';
import { HeroListComponent } from './hero-list.component';

const routes: Routes = [
  { path: '', component: HeroListComponent },
  { path: ':id', component: HeroDetailComponent },
];

export default routes;
