import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { DashboardHeroComponent } from './dashboard-hero.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [{ path: 'dashboard', component: DashboardComponent }];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [DashboardComponent, DashboardHeroComponent],
})
export class DashboardModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
