import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SearchingService {
    private searchTermSubject$ = new BehaviorSubject<string | null>(null);
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
        this.searchTermSubject$.next(updatedSearchTerm);
    }

    getSearchTerm(): Observable<string | null> {
        return this.searchTermSubject$.asObservable();
    }

    getSearchSuggestions(): Observable<string[] | null> {
        return this.searchingSuggestions$.asObservable();
    }
}
