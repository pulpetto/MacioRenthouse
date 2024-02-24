import { CheckboxFilter } from './checkbox-filter';
import { RangeFilter } from './range-filter';

export interface FiltersValues {
    checkboxFilters: CheckboxFilter[];
    rangeFilters: RangeFilter[];
}
