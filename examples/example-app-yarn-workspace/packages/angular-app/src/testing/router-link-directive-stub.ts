import { Directive, Input, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Directive({
  selector: '[routerLink]',
  standalone: true,
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') public linkParams: RouterLink | null = null;

  public navigatedTo: RouterLink | null = null;

  @HostListener('click')
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}
