import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'numberFormat',
})
export class NumberFormatPipe implements PipeTransform {
    transform(value: unknown, ...args: unknown[]): unknown {
        if (value === null || value === undefined) {
            return '';
        }

        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        // should the pipe return null or ''
        return null;
    }
}
