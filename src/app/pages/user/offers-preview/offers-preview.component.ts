import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, map } from 'rxjs';
import { DropdownMenu } from 'src/app/interfaces/dropdown/dropdown-menu';
import { FilterModel } from 'src/app/interfaces/filter-model';
import { Offer } from 'src/app/interfaces/offer';
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
        private searchingService: SearchingService
    ) {}

    availablefiltersValues$!: Observable<FilterModel | null>;

    ngOnInit() {
        window.scroll({
            top: 0,
            behavior: 'smooth',
        });

        this.availablefiltersValues$ =
            this.userService.getAvailableFiltersValues$();

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

        this.userService
            .getFiltersState$()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.refreshData();
            });
    }

    refreshData() {
        this.offersData$ = this.userService.getOffers(
            this.username,
            this.searchTerm,
            this.orderingBy,
            this.sortingBy,
            this.startIndex,
            this.maxItemsPerPage,
            this.sortingByCarProperties
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

    toggleFiltersVisiblity() {
        this.sliceFiltersTo =
            this.sliceFiltersTo === 10 ? this.filterDropdowns.length : 10;

        this.filtersVisibility = !this.filtersVisibility;
    }

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

    orderingDropdown: DropdownMenu = {
        dropdownName: 'Ordering',
        inputTypeProperties: {
            type: 'checkbox',
            dropdownOptions: ['Ascending', 'Descending'],
            dropdownMultiselect: false,
        },
    };

    sortingDropdown: DropdownMenu = {
        dropdownName: 'Sorting',
        inputTypeProperties: {
            type: 'checkbox',
            dropdownOptions: [
                'Publish date',
                'Price',
                'Production year',
                'Mileage',
                'Horse power',
            ],
            dropdownMultiselect: false,
        },
    };

    offersPerPageDropdown: DropdownMenu = {
        dropdownName: 'Offers per page',
        inputTypeProperties: {
            type: 'checkbox',
            dropdownOptions: ['10', '15', '20'],
            dropdownMultiselect: false,
        },
    };

    filterDropdowns: DropdownMenu[] = [
        {
            dropdownName: 'Car brand',
            inputTypeProperties: {
                type: 'checkbox',
                dropdownOptions: [
                    'Abarth',
                    'Alfa Romeo',
                    'Aston Martin',
                    'Audi',
                    'Bentley',
                    'BMW',
                    'Bugatti',
                    'Cadillac',
                    'Chevrolet',
                    'Chrysler',
                    'Citroën',
                    'Dacia',
                    'Daewoo',
                    'Daihatsu',
                    'Dodge',
                    'Donkervoort',
                    'DS',
                    'Ferrari',
                    'Fiat',
                    'Fisker',
                    'Ford',
                    'Honda',
                    'Hummer',
                    'Hyundai',
                    'Infiniti',
                    'Iveco',
                    'Jaguar',
                    'Jeep',
                    'Kia',
                    'KTM',
                    'Lada',
                    'Lamborghini',
                    'Lancia',
                    'Land Rover',
                    'Landwind',
                    'Lexus',
                    'Lotus',
                    'Maserati',
                    'Maybach',
                    'Mazda',
                    'McLaren',
                    'Mercedes-Benz',
                    'MG',
                    'Mini',
                    'Mitsubishi',
                    'Morgan',
                    'Nissan',
                    'Opel',
                    'Peugeot',
                    'Porsche',
                    'Renault',
                    'Rolls-Royce',
                    'Rover',
                    'Saab',
                    'Seat',
                    'Skoda',
                    'Smart',
                    'SsangYong',
                    'Subaru',
                    'Suzuki',
                    'Tesla',
                    'Toyota',
                    'Volkswagen',
                    'Volvo',
                ],
                dropdownMultiselect: true,
                filteringOption: 'carBrands',
            },
        },
        {
            dropdownName: 'Brand model',
            inputTypeProperties: {
                type: 'checkbox',
                dropdownOptions: [
                    'Alero',
                    'Aveo',
                    'Camaro',
                    'Captiva',
                    'Corvette',
                    'Cruze',
                    'Cruze SW',
                    'Epica',
                    'Equinox',
                    'Evanda',
                ],
                dropdownMultiselect: true,
                filteringOption: 'carModels',
            },
        },
        {
            dropdownName: 'Fuel type',
            inputTypeProperties: {
                type: 'checkbox',
                dropdownOptions: [
                    'Petrol',
                    'Diesel',
                    'Hydrogen',
                    'Electric',
                    'Ethanol',
                    'LPG',
                    'Hybrid',
                ],
                dropdownMultiselect: true,
                filteringOption: 'fuelTypes',
            },
        },
        {
            dropdownName: 'Gearbox type',
            inputTypeProperties: {
                type: 'checkbox',
                dropdownOptions: ['Manual', 'Automatic'],
                dropdownMultiselect: true,
                filteringOption: 'gearboxTypes',
            },
        },
        {
            dropdownName: 'Price from',
            inputTypeProperties: {
                type: 'range',
                minVal: 0,
                maxVal: 1000000,
                suffix: 'zł',
                minimalValChange: 1000,
                minOrMax: 'min',
                filteringOption: 'priceFrom',
                name: 'price',
            },
        },
        {
            dropdownName: 'Price up to',
            inputTypeProperties: {
                type: 'range',
                minVal: 0,
                maxVal: 1000000,
                suffix: 'zł',
                minimalValChange: 1000,
                minOrMax: 'max',
                filteringOption: 'priceTo',
                name: 'price',
            },
        },
        {
            dropdownName: 'HP from',
            inputTypeProperties: {
                type: 'range',
                minVal: 0,
                maxVal: 2000,
                suffix: 'hp',
                minimalValChange: 10,
                minOrMax: 'min',
                filteringOption: 'horsePowerFrom',
                name: 'horsePower',
            },
        },
        {
            dropdownName: 'HP up to',
            inputTypeProperties: {
                type: 'range',
                minVal: 0,
                maxVal: 2000,
                suffix: 'hp',
                minimalValChange: 10,
                minOrMax: 'max',
                filteringOption: 'horsePowerTo',
                name: 'horsePower',
            },
        },
        {
            dropdownName: 'Engine size from',
            inputTypeProperties: {
                type: 'range',
                minVal: 0,
                maxVal: 8400,
                suffix: 'cm³',
                minimalValChange: 10,
                minOrMax: 'min',
                filteringOption: 'engineSizeFrom',
                name: 'engineSize',
            },
        },
        {
            dropdownName: 'Engine size up to',
            inputTypeProperties: {
                type: 'range',
                minVal: 0,
                maxVal: 8400,
                suffix: 'cm³',
                minimalValChange: 10,
                minOrMax: 'max',
                filteringOption: 'engineSizeTo',
                name: 'engineSize',
            },
        },
        {
            dropdownName: 'Year from',
            inputTypeProperties: {
                type: 'range',
                minVal: 1950,
                maxVal: 2024,
                suffix: '',
                minimalValChange: 1,
                minOrMax: 'min',
                mask: '0000',
                filteringOption: 'productionYearFrom',
                name: 'productionYear',
            },
        },
        {
            dropdownName: 'Year up to',
            inputTypeProperties: {
                type: 'range',
                minVal: 1950,
                maxVal: 2024,
                suffix: '',
                minimalValChange: 1,
                minOrMax: 'max',
                mask: '0000',
                filteringOption: 'productionYearTo',
                name: 'productionYear',
            },
        },
        {
            dropdownName: 'Mileage from',
            inputTypeProperties: {
                type: 'range',
                minVal: 0,
                maxVal: 500000,
                suffix: 'km',
                minimalValChange: 1000,
                minOrMax: 'min',
                filteringOption: 'mileageFrom',
                name: 'mileage',
            },
        },
        {
            dropdownName: 'Mileage up to',
            inputTypeProperties: {
                type: 'range',
                minVal: 0,
                maxVal: 500000,
                suffix: 'km',
                minimalValChange: 1000,
                minOrMax: 'max',
                filteringOption: 'mileageTo',
                name: 'mileage',
            },
        },
        {
            dropdownName: 'Seats',
            inputTypeProperties: {
                type: 'checkbox',
                dropdownOptions: ['2', '3', '4', '5', '6', '7', '8'],
                dropdownMultiselect: true,
                filteringOption: 'seatsAmount',
            },
        },
    ];
}
