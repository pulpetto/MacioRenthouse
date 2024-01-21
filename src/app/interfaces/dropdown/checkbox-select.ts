import { MultiOptionFilters } from '../multi-option-filters';

export interface CheckboxSelect {
    type: 'checkbox';
    dropdownOptions: string[];
    dropdownMultiselect: boolean;
    filteringOption?: MultiOptionFilters;
}
