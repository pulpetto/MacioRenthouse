export interface DropdownMenu {
    dropdownName: string;
    dropdownOptions: string[];
    dropdownMultiselect: boolean;
    // for range input
    type?: string;
    minVal?: number;
    maxVal?: number;
    suffix?: string;
    minimalValChange?: number;
}
