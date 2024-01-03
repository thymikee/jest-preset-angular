import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'titlecase', pure: true, standalone: true })
export class TitleCasePipe implements PipeTransform {
  transform(input: string): string {
    return input.length === 0
      ? ''
      : input.replace(/\w\S*/g, (txt) => txt[0].toUpperCase() + txt.substr(1).toLowerCase());
  }
}
