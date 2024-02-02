import { RangeFilters } from '../range-filters';

export interface RangeSelect {
    type: 'range';
    minVal: number;
    maxVal: number;
    suffix: string;
    minimalValChange: number;
    minOrMax: 'min' | 'max';
    mask?: string;
    filteringOption?: RangeFilters;
    name?: string;
}
