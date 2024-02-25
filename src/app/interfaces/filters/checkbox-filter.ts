import { CheckboxOption } from './checkbox-option';

export interface CheckboxFilter {
    staticProperties: {
        name: string;
        displayedLabel: string;
        isMultiSelect: boolean;
    };
    dynamicProperties: {
        checkedOptions: CheckboxOption[];
        availableOptions: CheckboxOption[];
        unavailableOptions: string[];
    };
}
