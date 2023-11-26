import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable, map } from 'rxjs';
import { VisibilityService } from '../services/visibility.service';
import { SearchingService } from '../services/searching.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
    userFirstName$!: Observable<string | null>;
    searchBarVisibility$!: Observable<boolean>;

    term: string = '';

    constructor(
        private userService: UserService,
        private visibilityService: VisibilityService,
        private searchingService: SearchingService
    ) {}

    ngOnInit() {
        this.userFirstName$ = this.userService
            .getUser()
            .pipe(map((user) => user?.name || null));

        this.searchBarVisibility$ =
            this.visibilityService.getHeaderSearchBarVisibility();
    }

    onSearchTermSubmit(searchTerm: string) {
        this.searchingService.updateSearchTerm(searchTerm);
        console.log(searchTerm);
    }

    setFocusState(state: boolean) {
        this.visibilityService.setHeaderSearchBarFocusState(state);
    }

    navigateToDashboard() {
        this.userService.navigateToDashboard();
    }
}
