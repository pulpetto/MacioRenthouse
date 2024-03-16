export interface RangeFilter {
    staticProperties: {
        name: string;
        generalName: string;
        displayedLabel: string;
        suffix: string;
        minOrMax: 'min' | 'max';
        mask: 'separator' | '0000';
    };
    dynamicProperties: {
        [key: string]: number;
        minValue: number;
        maxValue: number;
    };
}
