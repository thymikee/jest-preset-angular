import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { routedComponents, HeroRoutingModule } from './hero-routing.module';

@NgModule({
  imports: [SharedModule, HeroRoutingModule],
  declarations: [routedComponents],
})
export class HeroModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
