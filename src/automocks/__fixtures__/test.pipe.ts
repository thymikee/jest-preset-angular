import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'test',
})
export class TestPipe implements PipeTransform {
    public transform(value: string): string {
        return `test ${value}`;
    }
}
