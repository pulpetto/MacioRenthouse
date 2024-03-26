import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FiltersValues } from 'src/app/interfaces/filters/filters-values';
import { Offer } from 'src/app/interfaces/offer';
import { FiltersService } from 'src/app/services/filters.service';
import { SearchingService } from 'src/app/services/searching.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-offers-preview',
    templateUrl: './offers-preview.component.html',
    styleUrls: ['./offers-preview.component.css'],
})
export class OffersPreviewComponent implements OnInit {
    Math: Math = Math;
    destroyRef = inject(DestroyRef);
    filtersVisibility: boolean = false;
    currentPage: number = 1;
    maxItemsPerPage: number = 10;

    username!: string | null;
    searchQuery!: string | null;
    get startIndex(): number {
        return (this.currentPage - 1) * this.maxItemsPerPage;
    }
    orderingBy: string = 'ascending';
    sortingBy: string = 'unixPublishDate';
    sortingByCarProperties: boolean = false;

    offersData$!: Observable<{
        offers: Offer[];
        offersAmount: number;
        pagesAmount: number;
    } | null>;

    searchTerm: string | null = null;
    sliceFiltersTo: number = 10;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private searchingService: SearchingService,
        private filtersService: FiltersService
    ) {}

    filtersState!: FiltersValues | null;

    ngOnInit() {
        window.scroll({
            top: 0,
            behavior: 'smooth',
        });

        this.filtersService
            .getFiltersState$()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((filtersState) => {
                this.filtersState = filtersState;
                this.refreshData();
            });

        this.route.paramMap
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((params) => {
                this.username = params.get('username');
                this.searchingService.setRouteUsername(this.username);
                this.refreshData();
            });

        this.route.paramMap
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((params) => {
                this.searchQuery = params.get('searchQuery');

                if (this.searchQuery) {
                    this.searchTerm = this.searchQuery.replace('_', ' ');
                    this.searchingService.updateSearchTerm(this.searchTerm);
                } else {
                    this.searchingService.clearSearchTerm();
                }

                this.refreshData();
            });

        this.searchingService.searchTriggered$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.refreshData();
            });

        this.searchingService
            .getSearchTerm()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((searchTerm) => {
                this.searchTerm = searchTerm;
            });
    }

    refreshData() {
        this.offersData$ = this.userService.getOffers2(
            this.username,
            this.searchTerm,
            this.orderingBy,
            this.sortingBy,
            this.startIndex,
            this.maxItemsPerPage,
            this.sortingByCarProperties,
            this.filtersState
        );
    }

    onPageChange(pageNumber: number) {
        if (this.currentPage === pageNumber) return;

        this.currentPage = pageNumber;
        window.scroll({
            top: 0,
            behavior: 'smooth',
        });

        this.refreshData();
    }

    toggleExpand = function (element: any) {
        if (!element.style.height || element.style.height == '0px') {
            element.style.height =
                Array.prototype.reduce.call(
                    element.childNodes,
                    function (p, c) {
                        return p + (c.offsetHeight || 0);
                    },
                    0
                ) + 'px';
        } else {
            element.style.height = '0px';
        }
    };

    orderingChange($event: string) {
        this.orderingBy = $event.toLowerCase();
        this.currentPage = 1;
        this.refreshData();
    }

    sortingChange($event: string) {
        this.sortingBy = $event.toLowerCase();

        // not reusable because of naming conflicts
        if (this.sortingBy === 'publish date') {
            this.sortingBy = 'unixPublishDate';
        }
        if (this.sortingBy === 'production year') {
            this.sortingBy = 'productionYear';
        }
        if (this.sortingBy === 'horse power') {
            this.sortingBy = 'horsePower';
        }

        if (this.sortingBy === 'publish date' || this.sortingBy === 'price') {
            this.sortingByCarProperties = false;
        } else {
            this.sortingByCarProperties = true;
        }

        this.currentPage = 1;
        this.refreshData();
    }

    maxOffersPerPageChange($event: string) {
        if ($event === '10') this.maxItemsPerPage = 10;
        if ($event === '15') this.maxItemsPerPage = 15;
        if ($event === '20') this.maxItemsPerPage = 20;
        this.refreshData();
    }
}
