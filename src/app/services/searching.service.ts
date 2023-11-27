import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SearchingService {
    private searchTermSubject$ = new BehaviorSubject<string | null>(null);

    updateSearchTerm(updatedSearchTerm: string) {
        this.searchTermSubject$.next(updatedSearchTerm);
    }

    getSearchTerm(): Observable<string | null> {
        return this.searchTermSubject$.asObservable();
    }
}
