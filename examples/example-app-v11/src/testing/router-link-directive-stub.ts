import { Directive, Input, HostListener } from '@angular/core';
import { NgModule } from '@angular/core';

// export for convenience.
export { RouterLink } from '@angular/router';

// tslint:disable: directive-class-suffix directive-selector
@Directive({
  selector: '[routerLink]',
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  @HostListener('click')
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

/// Dummy module to satisfy Angular Language service. Never used.

@NgModule({
  declarations: [RouterLinkDirectiveStub],
})
export class RouterStubsModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
