import { Component, HostListener, OnInit } from '@angular/core';
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
    isSearchBarFocused$!: Observable<boolean | null>;
    autocompleteOptions$!: Observable<string[] | null>;
    // prettier-ignore
    autocompleteOptionsLetters$!:Observable<{
        letter: string;
        match: boolean;
    }[][] | null>;
    searchTerm: string = '';
    // only for visual effect
    isSearchBarFocused: boolean = false;

    constructor(
        private visibilityService: VisibilityService,
        private searchingService: SearchingService
    ) {}

    ngOnInit() {
        this.isSearchBarFocused$ =
            this.visibilityService.getHeaderSearchBarFocusState();

        this.autocompleteOptions$ =
            this.searchingService.getSearchSuggestions();

        this.autocompleteOptionsLetters$ =
            this.searchingService.getSearchSuggestionsLetters();
    }

    setFocusState(state: boolean) {
        this.visibilityService.setHeaderSearchBarFocusState(state);
    }

    onSearchTermChange() {
        this.searchingService.updateSearchTerm(this.searchTerm);
    }

    onSearchTermSubmit() {}
}
