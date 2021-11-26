import { Directive, Input, HostListener } from '@angular/core';
import { NgModule } from '@angular/core';

export { RouterLink } from '@angular/router';

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

@NgModule({
  declarations: [RouterLinkDirectiveStub],
})
export class RouterStubsModule {}
