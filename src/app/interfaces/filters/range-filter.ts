export interface RangeFilter {
    staticProperties: {
        name: string;
        displayedLabel: string;
        suffix: string;
        minOrMax: 'min' | 'max';
        mask: 'separator' | '0000';
    };
    dynamicProperties: {
        minValue: number;
        maxValue: number;
    };
}
