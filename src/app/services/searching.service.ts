import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SearchingService {
    private searchTermSubject = new BehaviorSubject<string | null>(null);

    updateSearchTerm(updatedSearchTerm: string) {
        this.searchTermSubject.next(updatedSearchTerm);
    }
}
