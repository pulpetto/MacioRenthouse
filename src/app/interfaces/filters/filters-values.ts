import { CheckboxFilter } from './checkbox-filter';
import { RangeFilter } from './range-filter';

export interface FiltersValues {
    checkboxFilters: {
        [key: string]: CheckboxFilter;
        carBrands: CheckboxFilter;
        fuelTypes: CheckboxFilter;
        gearboxTypes: CheckboxFilter;
        seats: CheckboxFilter;
    };
    rangeFilters: {
        [key: string]: RangeFilter;

        priceFrom: RangeFilter;
        priceTo: RangeFilter;

        horsePowerFrom: RangeFilter;
        horsePowerUpTo: RangeFilter;

        engineSizeFrom: RangeFilter;
        engineSizeUpTo: RangeFilter;

        productionYearFrom: RangeFilter;
        productionYearUpTo: RangeFilter;

        mileageFrom: RangeFilter;
        mileageUpTo: RangeFilter;
    };
}
