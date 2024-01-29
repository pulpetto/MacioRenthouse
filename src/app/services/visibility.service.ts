import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root',
})
export class VisibilityService {
    private isHeaderAndFooterVisible = new BehaviorSubject<boolean>(true);
    private isHeaderSearchBarVisible = new BehaviorSubject<boolean>(false);
    private isHeaderSearchBarFocused = new BehaviorSubject<boolean>(false);

    setHeaderAndFooterVisibility(visibility: boolean) {
        this.isHeaderAndFooterVisible.next(visibility);
    }

    setHeaderSearchBarVisibility(visibility: boolean) {
        this.isHeaderSearchBarVisible.next(visibility);
    }

    setHeaderSearchBarFocusState(isFocused: boolean) {
        this.isHeaderSearchBarFocused.next(isFocused);
    }

    getHeaderAndFooterVisibility(): Observable<boolean> {
        return this.isHeaderAndFooterVisible.asObservable();
    }

    getHeaderSearchBarVisibility(): Observable<boolean> {
        return this.isHeaderSearchBarVisible.asObservable();
    }

    getHeaderSearchBarFocusState(): Observable<boolean> {
        return this.isHeaderSearchBarFocused.asObservable();
    }
}
