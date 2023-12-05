import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SearchingService {
    private searchTerm$ = new BehaviorSubject<string | null>(null);
    private searchingSuggestions$ = new BehaviorSubject<string[] | null>([
        'Acura',
        'Alfa Romeo',
        'Aston Martin',
        'Audi',
        'Bentley',
        'BMW',
        'Buick',
    ]);

    updateSearchTerm(updatedSearchTerm: string) {
        this.searchTerm$.next(updatedSearchTerm);

        const searchTermFixed = updatedSearchTerm
            .toLowerCase() // Convert to lowercase
            .trim() // Trim leading and trailing whitespaces
            .replace(/[^\w\s]/gi, '') // Remove non-alphanumeric characters
            .normalize('NFD') // Normalize accents/diacritics
            .replace(/[\u0300-\u036f]/g, ''); // Remove accents/diacritics

        const searchingSuggestionsFiltered =
            this.searchingSuggestions$.value?.filter((suggestion) => {
                // add other fixes to the suggestion string
                return suggestion.toLowerCase().startsWith(searchTermFixed);
            }) || null;

        this.searchingSuggestions$.next(searchingSuggestionsFiltered);
    }

    getSearchTerm(): Observable<string | null> {
        return this.searchTerm$.asObservable();
    }

    getSearchSuggestions(): Observable<string[] | null> {
        return this.searchingSuggestions$.asObservable();
    }
}
