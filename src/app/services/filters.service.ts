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
    private filtersState = new BehaviorSubject<FiltersValues | null>(null);

    constructor(private utilityService: UtilityService) {}

    getFiltersState$(): Observable<FiltersValues | null> {
        return this.filtersState.asObservable();
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
                // carModels: {
                //     staticProperties: {
                //         name: 'carModels',
                //         displayedLabel: 'Car Models',
                //         isMultiSelect: true,
                //     },
                //     dynamicProperties: {
                //         checkedOptions: [],
                //         availableOptions: [],
                //         unavailableOptions: [],
                //     },
                // },
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

        this.filtersState.next(
            this.calculateOptionsCount(initialFiltersValues, offers)
        );

        // make everything checked here, then in checkbox component just check if everything is checked, if yes then don't show it as checked
        // if all available options are not checked, make them checked undere the hood
    }

    filterOffers(filtersValues: FiltersValues, offers: Offer[]): Offer[] {
        offers = offers.filter((offer) => {
            const {
                carBrands: { options: carBrandOptions },
                fuelTypes: { options: fuelTypesOptions },
                gearboxTypes: { options: gearboxTypesOptions },
                seats: { options: seatsOptions },
            } = filtersValues.checkboxFilters;

            if (
                // FIX LATER - so that all created offers will have every property in lowercase // remove capitalization here
                (carBrandOptions.length > 0 &&
                    !carBrandOptions.some(
                        (option) =>
                            option.name ===
                            this.utilityService.capitalizeEveryWord(
                                offer.car.carBrand
                            )
                    ) &&
                    !carBrandOptions.some(
                        (option) =>
                            option.name === offer.car.carBrand.toLowerCase()
                    )) ||
                (fuelTypesOptions.length > 0 &&
                    !fuelTypesOptions.some(
                        (option) => option.name === offer.car.fuelType
                    )) ||
                (gearboxTypesOptions.length > 0 &&
                    !gearboxTypesOptions.some(
                        (option) => option.name === offer.car.gearboxType
                    )) ||
                (seatsOptions.length > 0 &&
                    !seatsOptions.some(
                        (option) => option.name === String(offer.car.seats)
                    ))
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
                ].dynamicProperties.availableOptions.find(
                    (option: CheckboxOption) =>
                        option.optionName ===
                        offer.car[key === 'seats' ? key : key.slice(0, -1)]
                );

                if (existingOption) {
                    existingOption.count++;
                } else {
                    // if only 1 filter has any option in checked, then allow him to sitll have other options in AVAILABLE[] AND NOT UNAVAILABLE[]
                    // conditional binding for correct options[]
                    filtersValues.checkboxFilters[
                        key
                    ].dynamicProperties.availableOptions.push({
                        optionName: String(
                        name: String(
                            offer.car[key === 'seats' ? key : key.slice(0, -1)]
                        ),
                        id: this.utilityService.generateRandomString(10),
                        count: 1,
                        status: 'checked',
                        // isChecked:
                        // this.filtersState.value === null ? true : false,
                    });
                }
            }
        });

        return filtersValues;
    }
}

// APPROACHES:

// 1
// Everything goes to checked array, and in checkbox component if checked array is the only one with options, they wont have checkbox checked

// 2
//
//     this.checkedOptionsChangeEvent.emit(checkedOptionsCount);
// }
