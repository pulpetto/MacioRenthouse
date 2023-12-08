import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class UtilityService {
    capitalizeEveryWord(inputString: string): string {
        const words = inputString.split(/\s+/);
        const capitalizedWords = words.map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        );
        const resultString = capitalizedWords.join(' ');

        return resultString;
    }
}
