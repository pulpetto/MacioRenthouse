import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, map } from 'rxjs';
import { DropdownMenu } from 'src/app/interfaces/dropdown/dropdown-menu';
import { Offer } from 'src/app/interfaces/offer';
import { SearchingService } from 'src/app/services/searching.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-offers-preview',
    templateUrl: './offers-preview.component.html',
    styleUrls: ['./offers-preview.component.css'],
})
export class OffersPreviewComponent implements OnInit {
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

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private searchingService: SearchingService
    ) {}

    ngOnInit() {
        window.scroll({
            top: 0,
            behavior: 'smooth',
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
            },
        },
        {
            dropdownName: 'Gearbox type',
            inputTypeProperties: {
                type: 'checkbox',
                dropdownOptions: ['Manual', 'Automatic'],
                dropdownMultiselect: true,
            },
        },
        {
            dropdownName: 'Price from',
            inputTypeProperties: {
                type: 'range',
                minVal: 1000,
                maxVal: 1000000,
                suffix: 'zł',
                minimalValChange: 1000,
            },
        },
        {
            dropdownName: 'Price up to',
            inputTypeProperties: {
                type: 'range',
                minVal: 1000,
                maxVal: 1000000,
                suffix: 'zł',
                minimalValChange: 1000,
            },
        },
        {
            dropdownName: 'HP from',
            inputTypeProperties: {
                type: 'range',
                minVal: 68,
                maxVal: 2000,
                suffix: 'hp',
                minimalValChange: 10,
            },
        },
        {
            dropdownName: 'HP up to',
            inputTypeProperties: {
                type: 'range',
                minVal: 68,
                maxVal: 2000,
                suffix: 'hp',
                minimalValChange: 10,
            },
        },
        {
            dropdownName: 'Engine size from',
            inputTypeProperties: {
                type: 'range',
                minVal: 1000,
                maxVal: 8400,
                suffix: 'cm³',
                minimalValChange: 10,
            },
        },
        {
            dropdownName: 'Engine size up to',
            inputTypeProperties: {
                type: 'range',
                minVal: 1000,
                maxVal: 8400,
                suffix: 'cm³',
                minimalValChange: 10,
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
            },
        },
        {
            dropdownName: 'Seats',
            inputTypeProperties: {
                type: 'checkbox',
                dropdownOptions: ['2', '3', '4', '5', '6', '7'],
                dropdownMultiselect: true,
            },
        },
        {
            dropdownName: 'Country',
            inputTypeProperties: {
                type: 'checkbox',
                dropdownOptions: [
                    'Afghanistan',
                    'Albania',
                    'Algeria',
                    'American Samoa',
                    'Andorra',
                    'Angola',
                    'Anguilla',
                    'Antarctica',
                    'Antigua and Barbuda',
                    'Argentina',
                    'Armenia',
                    'Aruba',
                    'Australia',
                    'Austria',
                    'Azerbaijan',
                    'Bahamas (the)',
                    'Bahrain',
                    'Bangladesh',
                    'Barbados',
                    'Belarus',
                    'Belgium',
                    'Belize',
                    'Benin',
                    'Bermuda',
                    'Bhutan',
                    'Bolivia (Plurinational State of)',
                    'Bonaire, Sint Eustatius and Saba',
                    'Bosnia and Herzegovina',
                    'Botswana',
                    'Bouvet Island',
                    'Brazil',
                    'British Indian Ocean Territory (the)',
                    'Brunei Darussalam',
                    'Bulgaria',
                    'Burkina Faso',
                    'Burundi',
                    'Cabo Verde',
                    'Cambodia',
                    'Cameroon',
                    'Canada',
                    'Cayman Islands (the)',
                    'Central African Republic (the)',
                    'Chad',
                    'Chile',
                    'China',
                    'Christmas Island',
                    'Cocos (Keeling) Islands (the)',
                    'Colombia',
                    'Comoros (the)',
                    'Congo (the Democratic Republic of the)',
                    'Congo (the)',
                    'Cook Islands (the)',
                    'Costa Rica',
                    'Croatia',
                    'Cuba',
                    'Curaçao',
                    'Cyprus',
                    'Czechia',
                    "Côte d'Ivoire",
                    'Denmark',
                    'Djibouti',
                    'Dominica',
                    'Dominican Republic (the)',
                    'Ecuador',
                    'Egypt',
                    'El Salvador',
                    'Equatorial Guinea',
                    'Eritrea',
                    'Estonia',
                    'Eswatini',
                    'Ethiopia',
                    'Falkland Islands (the) [Malvinas]',
                    'Faroe Islands (the)',
                    'Fiji',
                    'Finland',
                    'France',
                    'French Guiana',
                    'French Polynesia',
                    'French Southern Territories (the)',
                    'Gabon',
                    'Gambia (the)',
                    'Georgia',
                    'Germany',
                    'Ghana',
                    'Gibraltar',
                    'Greece',
                    'Greenland',
                    'Grenada',
                    'Guadeloupe',
                    'Guam',
                    'Guatemala',
                    'Guernsey',
                    'Guinea',
                    'Guinea-Bissau',
                    'Guyana',
                    'Haiti',
                    'Heard Island and McDonald Islands',
                    'Holy See (the)',
                    'Honduras',
                    'Hong Kong',
                    'Hungary',
                    'Iceland',
                    'India',
                    'Indonesia',
                    'Iran (Islamic Republic of)',
                    'Iraq',
                    'Ireland',
                    'Isle of Man',
                    'Israel',
                    'Italy',
                    'Jamaica',
                    'Japan',
                    'Jersey',
                    'Jordan',
                    'Kazakhstan',
                    'Kenya',
                    'Kiribati',
                    "Korea (the Democratic People's Republic of)",
                    'Korea (the Republic of)',
                    'Kuwait',
                    'Kyrgyzstan',
                    "Lao People's Democratic Republic (the)",
                    'Latvia',
                    'Lebanon',
                    'Lesotho',
                    'Liberia',
                    'Libya',
                    'Liechtenstein',
                    'Lithuania',
                    'Luxembourg',
                    'Macao',
                    'Madagascar',
                    'Malawi',
                    'Malaysia',
                    'Maldives',
                    'Mali',
                    'Malta',
                    'Marshall Islands (the)',
                    'Martinique',
                    'Mauritania',
                    'Mauritius',
                    'Mayotte',
                    'Mexico',
                    'Micronesia (Federated States of)',
                    'Moldova (the Republic of)',
                    'Monaco',
                    'Mongolia',
                    'Montenegro',
                    'Montserrat',
                    'Morocco',
                    'Mozambique',
                    'Myanmar',
                    'Namibia',
                    'Nauru',
                    'Nepal',
                    'Netherlands (the)',
                    'New Caledonia',
                    'New Zealand',
                    'Nicaragua',
                    'Niger (the)',
                    'Nigeria',
                    'Niue',
                    'Norfolk Island',
                    'Northern Mariana Islands (the)',
                    'Norway',
                    'Oman',
                    'Pakistan',
                    'Palau',
                    'Palestine, State of',
                    'Panama',
                    'Papua New Guinea',
                    'Paraguay',
                    'Peru',
                    'Philippines (the)',
                    'Pitcairn',
                    'Poland',
                    'Portugal',
                    'Puerto Rico',
                    'Qatar',
                    'Republic of North Macedonia',
                    'Romania',
                    'Russian Federation (the)',
                    'Rwanda',
                    'Réunion',
                    'Saint Barthélemy',
                    'Saint Helena, Ascension and Tristan da Cunha',
                    'Saint Kitts and Nevis',
                    'Saint Lucia',
                    'Saint Martin (French part)',
                    'Saint Pierre and Miquelon',
                    'Saint Vincent and the Grenadines',
                    'Samoa',
                    'San Marino',
                    'Sao Tome and Principe',
                    'Saudi Arabia',
                    'Senegal',
                    'Serbia',
                    'Seychelles',
                    'Sierra Leone',
                    'Singapore',
                    'Sint Maarten (Dutch part)',
                    'Slovakia',
                    'Slovenia',
                    'Solomon Islands',
                    'Somalia',
                    'South Africa',
                    'South Georgia and the South Sandwich Islands',
                    'South Sudan',
                    'Spain',
                    'Sri Lanka',
                    'Sudan (the)',
                    'Suriname',
                    'Svalbard and Jan Mayen',
                    'Sweden',
                    'Switzerland',
                    'Syrian Arab Republic',
                    'Taiwan',
                    'Tajikistan',
                    'Tanzania, United Republic of',
                    'Thailand',
                    'Timor-Leste',
                    'Togo',
                    'Tokelau',
                    'Tonga',
                    'Trinidad and Tobago',
                    'Tunisia',
                    'Turkey',
                    'Turkmenistan',
                    'Turks and Caicos Islands (the)',
                    'Tuvalu',
                    'Uganda',
                    'Ukraine',
                    'United Arab Emirates (the)',
                    'United Kingdom of Great Britain and Northern Ireland (the)',
                    'United States Minor Outlying Islands (the)',
                    'United States of America (the)',
                    'Uruguay',
                    'Uzbekistan',
                    'Vanuatu',
                    'Venezuela (Bolivarian Republic of)',
                    'Viet Nam',
                    'Virgin Islands (British)',
                    'Virgin Islands (U.S.)',
                    'Wallis and Futuna',
                    'Western Sahara',
                    'Yemen',
                    'Zambia',
                    'Zimbabwe',
                    'Åland Islands',
                ],
                dropdownMultiselect: true,
            },
        },
        {
            dropdownName: 'City',
            inputTypeProperties: {
                type: 'checkbox',
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
        },
    ];
}
