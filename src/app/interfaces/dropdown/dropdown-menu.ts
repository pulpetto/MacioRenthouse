import { CheckboxSelect } from './checkbox-select';
import { RangeSelect } from './range-select';

export interface DropdownMenu {
    dropdownName: string;
    inputTypeProperties: CheckboxSelect | RangeSelect;
}
