import { FilteringOption } from '../filtering-option';

export interface CheckboxSelect {
    type: 'checkbox';
    dropdownOptions: string[];
    dropdownMultiselect: boolean;
    filteringOption?: FilteringOption;
}
