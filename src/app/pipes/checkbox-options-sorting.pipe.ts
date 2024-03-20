import { Pipe, PipeTransform } from '@angular/core';
import { CheckboxOption } from '../interfaces/filters/checkbox-option';

@Pipe({
    name: 'checkboxOptionsSorting',
})
export class CheckboxOptionsSortingPipe implements PipeTransform {
    transform(array: any[], field: string): any[] | null {
        if (!Array.isArray(array)) {
            return null;
        }

        array.sort((a: any, b: any) => {
            const order: {
                [key: string]: number;
            } = { checked: 1, available: 2, unavailable: 3 };
            const statusA = order[a[field]];
            const statusB = order[b[field]];

            return statusA - statusB;
        });

        return array;
    }
}
