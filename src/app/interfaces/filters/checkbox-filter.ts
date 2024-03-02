import { CheckboxOption } from './checkbox-option';

export interface CheckboxFilter {
    name: string;
    displayedLabel: string;
    isMultiSelect: boolean;
    options: CheckboxOption[];
}
