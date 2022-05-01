import { Directive, Input, HostListener } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';

@Directive({
  selector: '[routerLink]',
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') public linkParams: RouterLink | null = null;

  public navigatedTo: RouterLink | null = null;

  @HostListener('click')
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

@NgModule({
  declarations: [RouterLinkDirectiveStub],
})
export class RouterStubsModule {}
