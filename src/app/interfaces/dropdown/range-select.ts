import { RangeFilters } from '../range-filters';

export interface RangeSelect {
    type: 'range';
    minVal: number;
    maxVal: number;
    suffix: string;
    minimalValChange: number;
    mask?: string;
    filteringOption?: RangeFilters;
}
