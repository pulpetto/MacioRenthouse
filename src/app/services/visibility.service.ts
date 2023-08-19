import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root',
})
export class VisibilityService {
    private isHeaderVisible = new BehaviorSubject<boolean>(true);

    constructor(private router: Router) {}

    setHeaderVisibility(visibility: boolean) {
        this.isHeaderVisible.next(visibility);
        console.log('Setting header visibility to: ' + visibility);
    }

    // propably to delete later
    navigateTo(path: string) {
        this.router.navigate([path]);
        console.log('Navigating to: ' + path);
    }

    getHeaderVisibility(): Observable<boolean> {
        return this.isHeaderVisible.asObservable();
    }
}
