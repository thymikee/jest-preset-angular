import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroDetailComponent } from './hero-detail.component';
import { HeroListComponent } from './hero-list.component';

const routes: Routes = [
  { path: '', component: HeroListComponent },
  { path: ':id', component: HeroDetailComponent },
];

export const routedComponents = [HeroDetailComponent, HeroListComponent];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroRoutingModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
