import { CheckboxFilter } from './checkbox-filter';
import { RangeFilter } from './range-filter';

export interface FiltersValues {
    checkboxFilters: {
        [key: string]: CheckboxFilter;
        carBrands: CheckboxFilter;
        carModels: CheckboxFilter;
        fuelTypes: CheckboxFilter;
        gearboxTypes: CheckboxFilter;
        seats: CheckboxFilter;
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
