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
            horsePowerUpTo: RangeFilter;
        };
        engineSize: {
            engineSizeFrom: RangeFilter;
            engineSizeUpTo: RangeFilter;
        };
        productionYear: {
            productionYearFrom: RangeFilter;
            productionYearUpTo: RangeFilter;
        };
        mileage: {
            mileageFrom: RangeFilter;
            mileageUpTo: RangeFilter;
        };
    };
}
