import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CanvasComponent } from './canvas.component';
import { HighlightDirective } from './highlight.directive';
import { TitleCasePipe } from './title-case.pipe';

@NgModule({
  imports: [CommonModule],
  exports: [
    CommonModule,
    // SharedModule importers won't have to import FormsModule too
    FormsModule,
    HighlightDirective,
    TitleCasePipe,
    CanvasComponent,
  ],
  declarations: [HighlightDirective, TitleCasePipe, CanvasComponent],
})
export class SharedModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
