import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root',
})
export class VisibilityService {
    private isHeaderAndFooterVisible = new BehaviorSubject<boolean>(true);

    setHeaderAndFooterVisibility(visibility: boolean) {
        this.isHeaderAndFooterVisible.next(visibility);
        console.log('Setting header and footer visibility to: ' + visibility);
    }

    // propably to delete later
    // navigateTo(path: string) {
    //     this.router.navigate([path]);
    //     console.log('Navigating to: ' + path);
    // }

    getHeaderVisibility(): Observable<boolean> {
        return this.isHeaderAndFooterVisible.asObservable();
    }
}
