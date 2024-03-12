import { Injectable } from '@angular/core';
import { Offer } from '../interfaces/offer';
import { FiltersValues } from '../interfaces/filters/filters-values';
import { BehaviorSubject, Observable } from 'rxjs';
import { UtilityService } from './utility.service';
import { CheckboxOption } from '../interfaces/filters/checkbox-option';

@Injectable({
    providedIn: 'root',
})
export class FiltersService {
    private filtersState$ = new BehaviorSubject<FiltersValues | null>(null);
    checkedDropdownsSequence: string[] = [];

    constructor(private utilityService: UtilityService) {}

    getFiltersState$(): Observable<FiltersValues | null> {
        return this.filtersState$.asObservable();
    }

    updateFiltersCheckboxOptions(
        filterName: string,
        newOptions: CheckboxOption[]
    ) {
        if (filterName === 'seatsAmount') filterName = 'seats';

        let oldOptions = this.filtersState$.value;
        oldOptions!.checkboxFilters[filterName].options = newOptions;
        this.filtersState$.next(oldOptions);

        if (
            this.checkedDropdownsSequence.find(
                (option) => option === filterName
            )
        ) {
            this.checkedDropdownsSequence =
                this.checkedDropdownsSequence.filter(
                    (option) => option !== filterName
                );
        } else {
            this.checkedDropdownsSequence.push(filterName);
        }
    }

    resetFiltersCheckboxOptions(filterName: string) {
        // calculate which options are available and which are not
        // make checked empty
    }

    assignInitialValues(offers: Offer[]) {
        const initialFiltersValues: FiltersValues = {
            checkboxFilters: {
                carBrands: {
                    name: 'carBrands',
                    displayedLabel: 'Car Brands',
                    isMultiSelect: true,
                    options: [],
                },
                fuelTypes: {
                    name: 'fuelTypes',
                    displayedLabel: 'Fuel Types',
                    isMultiSelect: true,
                    options: [],
                },
                gearboxTypes: {
                    name: 'gearboxTypes',
                    displayedLabel: 'Gearbox Types',
                    isMultiSelect: true,
                    options: [],
                },
                seats: {
                    name: 'seatsAmount',
                    displayedLabel: 'Seats Amount',
                    isMultiSelect: true,
                    options: [],
                },
            },
            rangeFilters: {
                priceFrom: {
                    staticProperties: {
                        name: 'priceFrom',
                        displayedLabel: 'Price From',
                        suffix: 'zł',
                        minOrMax: 'min',
                        mask: 'separator',
                    },
                    dynamicProperties: {
                        minValue: Math.min(
                            ...offers.map((offer) => offer.price)
                        ),
                        maxValue: Math.max(
                            ...offers.map((offer) => offer.price)
                        ),
                    },
                },
                priceTo: {
                    staticProperties: {
                        name: 'priceUpTo',
                        displayedLabel: 'Price Up To',
                        suffix: 'zł',
                        minOrMax: 'max',
                        mask: 'separator',
                    },
                    dynamicProperties: {
                        minValue: Math.min(
                            ...offers.map((offer) => offer.price)
                        ),
                        maxValue: Math.max(
                            ...offers.map((offer) => offer.price)
                        ),
                    },
                },

                horsePowerFrom: {
                    staticProperties: {
                        name: 'horsePowerFrom',
                        displayedLabel: 'HP From',
                        suffix: 'hp',
                        minOrMax: 'min',
                        mask: 'separator',
                    },
                    dynamicProperties: {
                        minValue: Math.min(
                            ...offers.map((offer) => offer.car.horsePower)
                        ),
                        maxValue: Math.max(
                            ...offers.map((offer) => offer.car.horsePower)
                        ),
                    },
                },
                horsePowerUpTo: {
                    staticProperties: {
                        name: 'horsePowerUpTo',
                        displayedLabel: 'HP Up To',
                        suffix: 'hp',
                        minOrMax: 'max',
                        mask: 'separator',
                    },
                    dynamicProperties: {
                        minValue: Math.min(
                            ...offers.map((offer) => offer.car.horsePower)
                        ),
                        maxValue: Math.max(
                            ...offers.map((offer) => offer.car.horsePower)
                        ),
                    },
                },

                engineSizeFrom: {
                    staticProperties: {
                        name: 'engineSizeFrom',
                        displayedLabel: 'Engine Size From',
                        suffix: 'cm³',
                        minOrMax: 'min',
                        mask: 'separator',
                    },
                    dynamicProperties: {
                        minValue: Math.min(
                            ...offers.map((offer) => offer.car.engineCapacity)
                        ),
                        maxValue: Math.max(
                            ...offers.map((offer) => offer.car.engineCapacity)
                        ),
                    },
                },
                engineSizeUpTo: {
                    staticProperties: {
                        name: 'engineSizeUpTo',
                        displayedLabel: 'Engine Size Up To',
                        suffix: 'cm³',
                        minOrMax: 'max',
                        mask: 'separator',
                    },
                    dynamicProperties: {
                        minValue: Math.min(
                            ...offers.map((offer) => offer.car.engineCapacity)
                        ),
                        maxValue: Math.max(
                            ...offers.map((offer) => offer.car.engineCapacity)
                        ),
                    },
                },

                productionYearFrom: {
                    staticProperties: {
                        name: 'productionYearFrom',
                        displayedLabel: 'Year From',
                        suffix: '',
                        minOrMax: 'min',
                        mask: 'separator',
                    },
                    dynamicProperties: {
                        minValue: Math.min(
                            ...offers.map((offer) => offer.car.productionYear)
                        ),
                        maxValue: Math.max(
                            ...offers.map((offer) => offer.car.productionYear)
                        ),
                    },
                },
                productionYearUpTo: {
                    staticProperties: {
                        name: 'productionYearUpTo',
                        displayedLabel: 'Year Up To',
                        suffix: '',
                        minOrMax: 'max',
                        mask: 'separator',
                    },
                    dynamicProperties: {
                        minValue: Math.min(
                            ...offers.map((offer) => offer.car.productionYear)
                        ),
                        maxValue: Math.max(
                            ...offers.map((offer) => offer.car.productionYear)
                        ),
                    },
                },

                mileageFrom: {
                    staticProperties: {
                        name: 'mileageFrom',
                        displayedLabel: 'Mileage From',
                        suffix: 'km',
                        minOrMax: 'min',
                        mask: 'separator',
                    },
                    dynamicProperties: {
                        minValue: Math.min(
                            ...offers.map((offer) => offer.car.mileage)
                        ),
                        maxValue: Math.max(
                            ...offers.map((offer) => offer.car.mileage)
                        ),
                    },
                },
                mileageUpTo: {
                    staticProperties: {
                        name: 'mileageUpTo',
                        displayedLabel: 'Mileage Up To',
                        suffix: 'km',
                        minOrMax: 'max',
                        mask: 'separator',
                    },
                    dynamicProperties: {
                        minValue: Math.min(
                            ...offers.map((offer) => offer.car.mileage)
                        ),
                        maxValue: Math.max(
                            ...offers.map((offer) => offer.car.mileage)
                        ),
                    },
                },
            },
        };

        this.filtersState$.next(
            this.calculateOptionsCount(initialFiltersValues, offers)
        );
    }

    filterOffers(filtersValues: FiltersValues, offers: Offer[]): Offer[] {
        offers = offers.filter((offer) => {
            let allOptionsAvailable: { [key: string]: boolean } = {
                carBrands: false,
                fuelTypes: false,
                gearboxTypes: false,
                seats: false,
            };

            for (const [key, value] of Object.entries(
                filtersValues.checkboxFilters
            )) {
                if (
                    value.options.every(
                        (option: CheckboxOption) =>
                            option.status === 'available'
                    )
                ) {
                    allOptionsAvailable[key] = true;
                } else {
                    allOptionsAvailable[key] = false;
                }
            }

            const {
                carBrands: { options: carBrandOptions },
                fuelTypes: { options: fuelTypesOptions },
                gearboxTypes: { options: gearboxTypesOptions },
                seats: { options: seatsOptions },
            } = filtersValues.checkboxFilters;

            if (
                (carBrandOptions.length > 0 &&
                    !carBrandOptions.some((option) => {
                        if (
                            option.status === 'checked' ||
                            (allOptionsAvailable['carBrands'] === true &&
                                option.status === 'available')
                        ) {
                            return (
                                option.name ===
                                    offer.car.carBrand.toLowerCase() ||
                                option.name ===
                                    this.utilityService.capitalizeEveryWord(
                                        offer.car.carBrand
                                    )
                            );
                        } else {
                            return false;
                        }
                    })) ||
                (fuelTypesOptions.length > 0 &&
                    !fuelTypesOptions.some((option) => {
                        if (
                            option.status === 'checked' ||
                            (allOptionsAvailable['fuelTypes'] === true &&
                                option.status === 'available')
                        ) {
                            return option.name === offer.car.fuelType;
                        } else {
                            return false;
                        }
                    })) ||
                (gearboxTypesOptions.length > 0 &&
                    !gearboxTypesOptions.some((option) => {
                        if (
                            option.status === 'checked' ||
                            (allOptionsAvailable['gearboxTypes'] === true &&
                                option.status === 'available')
                        ) {
                            return option.name === offer.car.gearboxType;
                        } else {
                            return false;
                        }
                    })) ||
                (seatsOptions.length > 0 &&
                    !seatsOptions.some((option) => {
                        if (
                            option.status === 'checked' ||
                            (allOptionsAvailable['seats'] === true &&
                                option.status === 'available')
                        ) {
                            return option.name === String(offer.car.seats);
                        } else {
                            return false;
                        }
                    }))
            ) {
                return false;
            }

            const {
                priceFrom: {
                    dynamicProperties: { minValue: priceMinValue },
                },
                priceTo: {
                    dynamicProperties: { maxValue: priceMaxValue },
                },

                horsePowerFrom: {
                    dynamicProperties: { minValue: horsePowerMinValue },
                },
                horsePowerUpTo: {
                    dynamicProperties: { maxValue: horsePowerMaxValue },
                },

                engineSizeFrom: {
                    dynamicProperties: { minValue: engineSizeMinValue },
                },
                engineSizeUpTo: {
                    dynamicProperties: { maxValue: engineSizeMaxValue },
                },

                productionYearFrom: {
                    dynamicProperties: { minValue: productionYearMinValue },
                },
                productionYearUpTo: {
                    dynamicProperties: { maxValue: productionYearMaxValue },
                },

                mileageFrom: {
                    dynamicProperties: { minValue: mileageMinValue },
                },
                mileageUpTo: {
                    dynamicProperties: { maxValue: mileageMaxValue },
                },
            } = filtersValues.rangeFilters;

            if (
                (priceMinValue > 0 && offer.price < priceMinValue) ||
                (priceMaxValue > 0 && offer.price > priceMaxValue) ||
                (horsePowerMinValue > 0 &&
                    offer.car.horsePower < horsePowerMinValue) ||
                (horsePowerMaxValue > 0 &&
                    offer.car.horsePower > horsePowerMaxValue) ||
                (engineSizeMinValue > 0 &&
                    offer.car.engineCapacity < engineSizeMinValue) ||
                (engineSizeMaxValue > 0 &&
                    offer.car.engineCapacity > engineSizeMaxValue) ||
                (productionYearMinValue > 0 &&
                    offer.car.productionYear < productionYearMinValue) ||
                (productionYearMaxValue > 0 &&
                    offer.car.productionYear > productionYearMaxValue) ||
                (mileageMinValue > 0 && offer.car.mileage < mileageMinValue) ||
                (mileageMaxValue > 0 && offer.car.mileage > mileageMaxValue)
            ) {
                return false;
            }

            return true;
        });

        this.calculateOptionsCount(filtersValues, offers);

        return offers;
    }

    calculateOptionsCount(
        filtersValues: FiltersValues,
        offers: Offer[]
    ): FiltersValues {
        offers.forEach((offer, i) => {
            for (const [key, value] of Object.entries(
                filtersValues.checkboxFilters
            )) {
                const existingOption = filtersValues.checkboxFilters[
                    key
                ].options.find(
                    (option: CheckboxOption) =>
                        option.name ===
                        String(
                            offer.car[key === 'seats' ? key : key.slice(0, -1)]
                        )
                );

                if (existingOption) {
                    existingOption.count++;
                } else {
                    filtersValues.checkboxFilters[key].options.push({
                        name: String(
                            offer.car[key === 'seats' ? key : key.slice(0, -1)]
                        ),
                        id: this.utilityService.generateRandomString(10),
                        count: 1,
                        status: 'available',
                    });
                }
            }
        });

        return filtersValues;
    }
}



