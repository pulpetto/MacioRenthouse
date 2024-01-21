import { Injectable } from '@angular/core';
import {
    BehaviorSubject,
    Observable,
    Subject,
    debounceTime,
    distinctUntilChanged,
} from 'rxjs';
import { UserService } from './user.service';
import { UtilityService } from './utility.service';
import { Router } from '@angular/router';
import { FilterModel } from '../interfaces/filter-model';

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

    private searchTrigger = new Subject<void>();
    searchTriggered$ = this.searchTrigger.asObservable();

    filtersState: FilterModel = {
        multiOptionsFilters: {
            carBrands: [],
            carModels: [],
            fuelTypes: [],
            gearboxTypes: [],
            seatsAmount: [],
        },
        rangeFilters: {
            priceFrom: 0,
            priceTo: 0,
            horsePowerFrom: 0,
            horsePowerTo: 0,
            engineSizeFrom: 0,
            engineSizeTo: 0,
            productionYearFrom: 0,
            productionYearTo: 0,
            mileageFrom: 0,
            mileageTo: 0,
        },
    };

    constructor(
        private userService: UserService,
        private utilityService: UtilityService,
        private router: Router
    ) {}

    updateSearchTerm(updatedSearchTerm: string) {
        this.searchTerm$.next(
            this.utilityService.capitalizeEveryWord(updatedSearchTerm)
        );

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
            .pipe(debounceTime(300), distinctUntilChanged())
            .subscribe((searchingSuggestions) => {
                this.suggestionsLetters$.next([]);

                searchingSuggestions.map((suggestion) => {
                    const suggestionsLetters: {
                        letter: string;
                        match: boolean;
                    }[] = [];
                    Array.from(suggestion).map((letter) => {
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
                                searchTermLetters[i] ||
                            suggestionsLetters[i].letter.toLowerCase() ===
                                searchTermLetters[i].toLowerCase()
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

    triggerSearchSubmit() {
        let path = `offers/search/${this.searchTerm$.value?.replace(' ', '_')}`;

        if (this.routeUsername$.value) {
            path = `user/${
                this.routeUsername$.value
            }/offers/search/${this.searchTerm$.value?.replace(' ', '_')}`;
        }

        this.router.navigate([path]);

        this.searchTrigger.next();
    }

    clearSearchTerm() {
        this.searchTerm$.next(null);
    }
}
