/* eslint-disable import/order */
// These unused NgModules keep the Angular Language Service happy.
// The AppModule registers the final versions of these components
import { NgModule } from '@angular/core';

import { AppComponent as app_initial } from './app-initial.component';
@NgModule({ declarations: [app_initial] })
export class AppModuleInitial {}

import { BannerComponent as bc_initial } from './banner/banner-initial.component';
@NgModule({ declarations: [bc_initial] })
export class BannerModuleInitial {}

import { BannerComponent as bc_external } from './banner/banner-external.component';
@NgModule({ declarations: [bc_external] })
export class BannerModuleExternal {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
