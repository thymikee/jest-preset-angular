import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicHostComponent } from './dynamic-host.component';

@NgModule({
  declarations: [DynamicHostComponent],
  exports: [DynamicHostComponent],
  imports: [CommonModule],
})
export class DynamicHostModule {}
