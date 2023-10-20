import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable, map } from 'rxjs';
import { VisibilityService } from '../services/visibility.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
    userFirstName$!: Observable<string | null>;
    searchBarVisibility$!: Observable<boolean>;

    constructor(
        private userService: UserService,
        private visibilityService: VisibilityService
    ) {}

    ngOnInit() {
        this.userFirstName$ = this.userService
            .getUser()
            .pipe(map((user) => user?.name || null));

        this.searchBarVisibility$ =
            this.visibilityService.getHeaderSearchBarVisibility();
    }

    setFocusState(state: boolean) {
        this.visibilityService.setHeaderSearchBarFocusState(state);
    }

    navigateToDashboard() {
        this.userService.navigateToDashboard();
    }
}
