import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CanvasComponent } from './canvas.component';
import { HighlightDirective } from './highlight.directive';
import { TitleCasePipe } from './title-case.pipe';

@NgModule({
  imports: [CommonModule],
  exports: [CommonModule, FormsModule, HighlightDirective, TitleCasePipe, CanvasComponent],
  declarations: [HighlightDirective, TitleCasePipe, CanvasComponent],
})
export class SharedModule {}
