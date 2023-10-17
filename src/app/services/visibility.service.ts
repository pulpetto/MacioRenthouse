import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root',
})
export class VisibilityService {
    private isHeaderAndFooterVisible = new BehaviorSubject<boolean>(true);
    private isHeaderSearchBarVisible = new BehaviorSubject<boolean>(false);

    setHeaderAndFooterVisibility(visibility: boolean) {
        this.isHeaderAndFooterVisible.next(visibility);
        console.log('Setting header and footer visibility to: ' + visibility);
    }

    setHeaderSearchBarVisibility(visibility: boolean) {
        this.isHeaderSearchBarVisible.next(visibility);
        console.log('Setting header search bar visibility to: ' + visibility);
    }

    getHeaderAndFooterVisibility(): Observable<boolean> {
        return this.isHeaderAndFooterVisible.asObservable();
    }

    getHeaderSearchBarVisibility(): Observable<boolean> {
        return this.isHeaderSearchBarVisible.asObservable();
    }
}
