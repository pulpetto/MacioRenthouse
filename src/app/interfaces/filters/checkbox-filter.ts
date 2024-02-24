export interface CheckboxFilter {
    staticProperties: {
        name: string;
        displayedLabel: string;
        isMultiSelect: boolean;
    };
    dynamicProperties: {
        checkedOptions: {
            name: string;
            id: string;
            count: number;
            isChecked: boolean;
        }[];
        availableOptions: {
            name: string;
            id: string;
            count: number;
            isChecked: boolean;
        }[];
        unavailableOptions: string[];
    };
}
