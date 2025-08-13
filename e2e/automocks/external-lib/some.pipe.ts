import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'some',
})
export class SomePipe implements PipeTransform {
    public transform(value: string): string {
        return value.toUpperCase();
    }
}
