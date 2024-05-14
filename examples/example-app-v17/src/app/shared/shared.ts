import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import * as Services from './app.service';
import { HighlightDirective } from './highlight.directive';
import { TitleCasePipe } from './title-case.pipe';

export const sharedImports = [FormsModule, HighlightDirective, TitleCasePipe, NgIf, NgFor];

export { Services };
