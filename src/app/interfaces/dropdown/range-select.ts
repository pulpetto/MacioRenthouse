import { FilteringOption } from '../filtering-option';

export interface RangeSelect {
    type: 'range';
    minVal: number;
    maxVal: number;
    suffix: string;
    minimalValChange: number;
    filteringOption?: FilteringOption;
}
