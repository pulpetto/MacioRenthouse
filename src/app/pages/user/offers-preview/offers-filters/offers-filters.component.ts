import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
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
    baseFiltersState$!: Observable<FiltersValues | null>;

    constructor(private filtersService: FiltersService) {}

    ngOnInit() {
        this.filtersState$ = this.filtersService.getFiltersState$();
        this.baseFiltersState$ = this.filtersService.getBaseFiltersState$();
    }

    hasCheckedOption(accessKey: string): Observable<boolean> {
        if (accessKey === 'seatsAmount') accessKey = 'seats';

        return this.filtersState$.pipe(
            map(
                (filters) =>
                    !!filters?.checkboxFilters[accessKey].options.find(
                        (option) => option.status === 'checked'
                    )
            )
        );
    }

    clearAllCheckboxFiltersOptions() {
        this.filtersService.clearAllCheckboxFiltersOptions();
    }

    clearAllCheckboxFilterOptions(filterName: string) {
        this.filtersService.clearAllCheckboxFilterOptions(filterName);
    }

    clearSingleCheckboxFilterOption(filterName: string, index: number) {
        this.filtersService.clearSingleCheckboxFilterOption(filterName, index);
    }

    clearAllRangeFilterValues(generalFilterName: string) {
        this.filtersService.clearAllRangeFilterValues(generalFilterName);
    }

    clearMinRangeFilterValue(generalFilterName: string) {
        this.filtersService.clearMinRangeFilterValue(generalFilterName);
    }

    clearMaxRangeFilterValue(generalFilterName: string) {
        this.filtersService.clearMaxRangeFilterValue(generalFilterName);
    }
}
