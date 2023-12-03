import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchingService } from 'src/app/services/searching.service';
import { UserService } from 'src/app/services/user.service';
import { VisibilityService } from 'src/app/services/visibility.service';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
    autocompleteOptions$!: Observable<string[] | null>;
    isSearchBarFocused: boolean = false;
    searchTerm: string = '';

    constructor(
        private visibilityService: VisibilityService,
        private userService: UserService,
        private searchingService: SearchingService
    ) {}

    ngOnInit() {
        this.autocompleteOptions$ =
            this.searchingService.getSearchSuggestions();
    }

    onSearchTermChange() {
        this.userService.getOffersBySearchTerm(this.searchTerm);
    }

    onSearchTermSubmit(searchTerm: string) {
        this.searchingService.updateSearchTerm(searchTerm);
    }

    setFocusState(state: boolean) {
        this.visibilityService.setHeaderSearchBarFocusState(state);
    }
}
