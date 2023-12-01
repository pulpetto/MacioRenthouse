import { Component } from '@angular/core';
import { SearchingService } from 'src/app/services/searching.service';
import { UserService } from 'src/app/services/user.service';
import { VisibilityService } from 'src/app/services/visibility.service';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
    autocompleteOptionsVisibility: boolean = false;
    searchTerm: string = '';

    constructor(
        private visibilityService: VisibilityService,
        private userService: UserService,
        private searchingService: SearchingService
    ) {}

    onSearchTermChange() {
        this.userService.getOffersBySearchTerm(this.searchTerm);
        this.autocompleteOptionsVisibility = true;
    }

    onSearchTermSubmit(searchTerm: string) {
        this.searchingService.updateSearchTerm(searchTerm);
    }

    setFocusState(state: boolean) {
        this.visibilityService.setHeaderSearchBarFocusState(state);
    }
}
