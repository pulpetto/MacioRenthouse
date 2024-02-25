import { CheckboxFilter } from './checkbox-filter';
import { RangeFilter } from './range-filter';

export interface FiltersValues {
    checkboxFilters: {
        carBrands: CheckboxFilter;
        carModels: CheckboxFilter;
        fuelTypes: CheckboxFilter;
        gearboxTypes: CheckboxFilter;
        seatsAmount: CheckboxFilter;
    };
    rangeFilters: {
        price: {
            priceFrom: RangeFilter;
            priceTo: RangeFilter;
        };
        horsePower: {
            horsePowerFrom: RangeFilter;
            horsePowerTo: RangeFilter;
        };
        engineSize: {
            engineSizeFrom: RangeFilter;
            engineSizeTo: RangeFilter;
        };
        productionYear: {
            productionYearFrom: RangeFilter;
            productionYearTo: RangeFilter;
        };
        mileage: {
            mileageFrom: RangeFilter;
            mileageTo: RangeFilter;
        };
    };
}
