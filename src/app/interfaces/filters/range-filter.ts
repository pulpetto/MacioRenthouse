export interface RangeFilter {
    staticProperties: {
        name: string;
        displayedLabel: string;
        suffix: string;
        minimalValueJump: number;
        minOrMax: 'min' | 'max';
        mask: 'separator' | '0000';
    };
    dynamicProperties: {
        currentMinValue: number;
        currentMaxValue: number;
        availableMinValue: number;
        availableMaxValue: number;
    };
}
