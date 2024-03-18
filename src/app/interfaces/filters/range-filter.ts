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
        [key: string]: number | boolean;
        canShowValue: boolean;
        minValue: number;
        maxValue: number;
    };
}
