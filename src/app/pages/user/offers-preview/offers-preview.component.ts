import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, map } from 'rxjs';
import { DropdownMenu } from 'src/app/interfaces/dropdown-menu';
import { Offer } from 'src/app/interfaces/offer';
import { SearchingService } from 'src/app/services/searching.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-offers-preview',
    templateUrl: './offers-preview.component.html',
    styleUrls: ['./offers-preview.component.css'],
})
export class OffersPreviewComponent implements OnInit {
    filtersVisibility: boolean = false;
    currentPage: number = 1;
    maxItemsPerPage: number = 10;

    username!: string | null;
    get startIndex(): number {
        return (this.currentPage - 1) * this.maxItemsPerPage;
    }
    orderingBy: string = 'ascending';
    sortingBy: string = 'unixPublishDate';
    sortingByCarProperties: boolean = false;
    searchTerm: string = '';

    sellerData$!: Observable<{
        offers: Offer[] | null;
        offersAmount: number | null;
        pagesAmount: number | null;
    }>;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private searchingService: SearchingService
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            this.username = params.get('username')!;

            this.searchingService.getSearchTerm().subscribe((term) => {
                if (term) {
                    this.searchTerm = term;
                }

                this.refreshData();
            });
        });
    }

    refreshData() {
        // if no filters then dont check for length
        if (this.username) {
            this.sellerData$ = combineLatest([
                this.userService.getOffersByUsername(
                    this.username,
                    this.orderingBy,
                    this.sortingBy,
                    this.startIndex,
                    this.maxItemsPerPage,
                    this.sortingByCarProperties
                ),
                this.userService.getOffersAmountByUsername(this.username),
            ]).pipe(
                map(([offers, offersAmount]) => ({
                    offers,
                    offersAmount,
                    pagesAmount: Math.ceil(
                        offersAmount! / this.maxItemsPerPage
                    ),
                }))
            );
        }
    }

    onPageChange(pageNumber: number) {
        if (this.currentPage === pageNumber || !this.username) return;

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

    orderingDropdown = {
        dropdownName: 'Ordering',
        dropdownOptions: ['Ascending', 'Descending'],
        dropdownMultiselect: false,
    };

    sortingDropdown: DropdownMenu = {
        dropdownName: 'Sorting',
        dropdownOptions: [
            'Publish date',
            'Price',
            'Production year',
            'Mileage',
            'Horse power',
        ],
        dropdownMultiselect: false,
    };

    filterDropdowns: DropdownMenu[] = [
        {
            dropdownName: 'Car brand',
            dropdownOptions: [
                'Acura',
                'Alfa Romeo',
                'Aston Martin',
                'Audi',
                'Bentley',
                'BMW',
                'Buick',
            ],
            dropdownMultiselect: true,
        },
        {
            dropdownName: 'Brand model',
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
        },
        {
            dropdownName: 'Fuel type',
            dropdownOptions: [
                'All',
                'Petrol',
                'Diesel',
                'Hydrogen',
                'Electric',
                'Ethanol',
                'LPG',
            ],
            dropdownMultiselect: true,
        },
        {
            dropdownName: 'Gearbox type',
            dropdownOptions: ['All', 'Manual', 'Automatic'],
            dropdownMultiselect: true,
        },
        {
            dropdownName: 'Price from',
            dropdownOptions: ['20 000', '30 000', '40 000', '50 000', '60 000'],
            dropdownMultiselect: true,
        },
        {
            dropdownName: 'Price up to',
            dropdownOptions: ['20 000', '30 000', '40 000', '50 000', '60 000'],
            dropdownMultiselect: true,
        },
        {
            dropdownName: 'HP up to',
            dropdownOptions: ['200', '300', '400', '500', '600'],
            dropdownMultiselect: true,
        },
        {
            dropdownName: 'HP from',
            dropdownOptions: ['200', '300', '400', '500', '600'],
            dropdownMultiselect: true,
        },
        {
            dropdownName: 'Engine size up to',
            dropdownOptions: ['2000', '1900', '1800', '1300', '1500'],
            dropdownMultiselect: true,
        },
        {
            dropdownName: 'Engine size from',
            dropdownOptions: ['2000', '1900', '1800', '1300', '1500'],
            dropdownMultiselect: true,
        },
        {
            dropdownName: 'Year to',
            dropdownOptions: [
                '2011',
                '2012',
                '2013',
                '2014',
                '2015',
                '2016',
                '2017',
                '2018',
                '2019',
                '2020',
            ],
            dropdownMultiselect: false,
        },
        {
            dropdownName: 'Year from',
            dropdownOptions: [
                '1980',
                '1981',
                '1982',
                '1983',
                '1984',
                '1985',
                '1986',
                '1987',
                '1988',
                '1989',
                '1990',
            ],
            dropdownMultiselect: false,
        },
        {
            dropdownName: 'Mileage up to',
            dropdownOptions: [
                '198022',
                '198122',
                '198222',
                '198322',
                '198422',
                '198225',
                '192286',
                '1928722',
                '1982228',
                '198229',
                '199220',
            ],
            dropdownMultiselect: true,
        },
        {
            dropdownName: 'Mileage from',
            dropdownOptions: [
                '19870',
                '166981',
                '1987772',
                '1987773',
                '197784',
                '19785',
                '197786',
                '198777',
                '19788',
                '1977770',
            ],
            dropdownMultiselect: true,
        },
        {
            dropdownName: 'Seats',
            dropdownOptions: ['1', '2', '3', '4', '5', '6', '7'],
            dropdownMultiselect: true,
        },
        {
            dropdownName: 'Country',
            dropdownOptions: [
                'United States',
                'Canada',
                'United Kingdom',
                'France',
                'Germany',
                'Japan',
                'Australia',
                'Brazil',
                'India',
                'China',
            ],
            dropdownMultiselect: true,
        },
        {
            dropdownName: 'City',
            dropdownOptions: [
                'New York',
                'Los Angeles',
                'London',
                'Paris',
                'Sydney',
                'Tokyo',
                'Toronto',
                'Rio de Janeiro',
                'Mumbai',
                'Beijing',
            ],
            dropdownMultiselect: true,
        },
    ];
}
