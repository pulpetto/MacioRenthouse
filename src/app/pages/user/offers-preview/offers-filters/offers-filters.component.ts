import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FiltersValues } from 'src/app/interfaces/filters/filters-values';
import { FiltersService } from 'src/app/services/filters.service';

@Component({
    selector: 'app-offers-filters',
    templateUrl: './offers-filters.component.html',
    styleUrls: ['./offers-filters.component.css'],
})
export class OffersFiltersComponent implements OnInit {
    Math: Math = Math;
    checkboxFiltersHoverStates: boolean[] = [];
    rangeFiltersHoverStates: boolean[] = [];
    filtersState$!: Observable<FiltersValues | null>;

    constructor(private filtersService: FiltersService) {}

    ngOnInit() {
        this.filtersState$ = this.filtersService.getFiltersState$();
    }
}
