import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Offer } from 'src/app/interfaces/offer';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-offers-preview',
    templateUrl: './offers-preview.component.html',
    styleUrls: ['./offers-preview.component.css'],
})
export class OffersPreviewComponent implements OnInit {
    filtersVisibility: boolean = false;
    sellerOffers: Offer[] = [];
    maxItemsPerPage: number = 10;
    offersAmount!: number;
    pagesAmount!: number;
    currentPage: number = 1;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            const username = params.get('username');
            const startIndex = (this.currentPage - 1) * this.maxItemsPerPage;
            // make it dynamic
            const sortingBy = 'price';

            if (username) {
                this.userService
                    .getOffersByUsername(
                        username,
                        sortingBy,
                        startIndex,
                        this.maxItemsPerPage
                    )
                    .subscribe((offers) => {
                        if (offers) {
                            this.sellerOffers = offers;
                        }
                    });

                this.userService
                    .getOffersAmountByUsername(username)
                    .subscribe((offersAmount) => {
                        if (offersAmount) {
                            this.offersAmount = offersAmount;
                            this.pagesAmount = Math.ceil(
                                offersAmount / this.maxItemsPerPage
                            );
                        }
                    });
            }
        });
    }

    // updateSellerOffers() {
    //     const startIndex = (this.currentPage - 1) * this.maxItemsPerPage;
    //     const endIndex = startIndex + this.maxItemsPerPage;

    //     this.sellerOffers.slice(startIndex, endIndex);
    // }

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

    dropdowns = [
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
