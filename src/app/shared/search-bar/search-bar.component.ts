import { Component } from '@angular/core';
import { SearchingService } from 'src/app/services/searching.service';
import { VisibilityService } from 'src/app/services/visibility.service';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
    constructor(
        private visibilityService: VisibilityService,
        private searchingService: SearchingService
    ) {}

    onSearchTermSubmit(searchTerm: string) {
        this.searchingService.updateSearchTerm(searchTerm);
    }

    setFocusState(state: boolean) {
        this.visibilityService.setHeaderSearchBarFocusState(state);
    }
}
