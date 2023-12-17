import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';
import { UtilityService } from './utility.service';

@Injectable({
    providedIn: 'root',
})
export class SearchingService {
    private routeUsername$ = new BehaviorSubject<string | null>(null);
    private searchTerm$ = new BehaviorSubject<string | null>(null);
    private searchingSuggestions$ = new BehaviorSubject<string[] | null>([]);
    // prettier-ignore
    private suggestionsLetters$ = new BehaviorSubject<{
        letter: string;
        match: boolean;
    }[][] | null>([]);

    constructor(
        private userService: UserService,
        private utilityService: UtilityService
    ) {}

    updateSearchTerm(updatedSearchTerm: string) {
        this.searchTerm$.next(updatedSearchTerm);

        const searchTermFixed = updatedSearchTerm
            .trim() // Trim leading and trailing whitespaces
            .replace(/[^\w\s]/gi, '') // Remove non-alphanumeric characters
            .normalize('NFD') // Normalize accents/diacritics
            .replace(/[\u0300-\u036f]/g, ''); // Remove accents/diacritics

        this.userService
            .getOffersNamesBySearchTerm(
                this.utilityService.capitalizeEveryWord(searchTermFixed),
                this.routeUsername$.value
            )
            .subscribe((searchingSuggestions) => {
                this.suggestionsLetters$.next([]);

                searchingSuggestions.map((suggestion) => {
                    const suggestionsLetters: {
                        letter: string;
                        match: boolean;
                    }[] = [];
                    Array.from(suggestion.toLowerCase()).map((letter) => {
                        const letterObj = {
                            letter: letter,
                            match: false,
                        };

                        suggestionsLetters.push(letterObj);
                    });

                    const searchTermLetters = Array.from(searchTermFixed);

                    for (let i = 0; i < searchTermLetters.length; i++) {
                        if (
                            suggestionsLetters[i].letter ===
                            searchTermLetters[i]
                        ) {
                            suggestionsLetters[i].match = true;
                        }
                    }

                    const updateVal = this.suggestionsLetters$.getValue();
                    updateVal?.push(suggestionsLetters);
                    this.suggestionsLetters$.next(updateVal);
                });

                this.searchingSuggestions$.next(searchingSuggestions);
            });
    }

    searchSubmit() {
        this.userService.getOffers(
            this.routeUsername$.value,
            this.searchTerm$.value
        );
    }

    getSearchTerm(): Observable<string | null> {
        return this.searchTerm$.asObservable();
    }

    getSearchSuggestions(): Observable<string[] | null> {
        return this.searchingSuggestions$.asObservable();
    }

    setRouteUsername(newValue: string | null) {
        this.routeUsername$.next(newValue);
    }

    getRouteUsername(): Observable<string | null> {
        return this.routeUsername$.asObservable();
    }

    // prettier-ignore
    getSearchSuggestionsLetters(): Observable<{
        letter: string;
        match: boolean;
    }[][] | null> {
        return this.suggestionsLetters$.asObservable();
    }
}
