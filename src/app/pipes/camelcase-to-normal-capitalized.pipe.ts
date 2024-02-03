import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'camelcaseToNormalCapitalized',
})
export class CamelcaseToNormalCapitalizedPipe implements PipeTransform {
    transform(value: string): string {
        return value
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .toLowerCase()
            .replace(/^./, (str) => str.toUpperCase());
    }
}
