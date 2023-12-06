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

    // prettier-ignore
    private suggestionsLetters$ = new BehaviorSubject<{
        letter: string;
        match: boolean;
    }[][] | null>([]);

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

        this.suggestionsLetters$.next([]);

        searchingSuggestionsFiltered?.map((suggestion) => {
            const suggestionsLetters: { letter: string; match: boolean }[] = [];
            Array.from(suggestion.toLowerCase()).map((letter) => {
                const letterObj = {
                    letter: letter,
                    match: false,
                };

                suggestionsLetters.push(letterObj);
            });

            const searchTermLetters = Array.from(searchTermFixed);

            for (let i = 0; i < searchTermLetters.length; i++) {
                if (suggestionsLetters[i].letter === searchTermLetters[i]) {
                    suggestionsLetters[i].match = true;
                }
            }

            const updateVal = this.suggestionsLetters$.getValue();
            updateVal?.push(suggestionsLetters);
            this.suggestionsLetters$.next(updateVal);
        });

        this.searchingSuggestions$.next(searchingSuggestionsFiltered);
    }

    getSearchTerm(): Observable<string | null> {
        return this.searchTerm$.asObservable();
    }

    getSearchSuggestions(): Observable<string[] | null> {
        return this.searchingSuggestions$.asObservable();
    }
}
