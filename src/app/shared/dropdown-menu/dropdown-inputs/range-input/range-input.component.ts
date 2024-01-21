import { Component, Input } from '@angular/core';
import { FilteringOption } from 'src/app/interfaces/filtering-option';

@Component({
    selector: 'app-range-input',
    templateUrl: './range-input.component.html',
    styleUrls: ['./range-input.component.css'],
})
export class RangeInputComponent {
    @Input() minVal!: number;
    @Input() maxVal!: number;
    @Input() suffix: string = '';
    @Input() minimalValChange!: number;
    @Input() ngxMask: string = 'separator';
    @Input() connectedToFilter: FilteringOption | undefined;

    applyButtonDisabled: boolean = true;
    clearButtonDisabled: boolean = true;

    numberInputValue: string = '';
    rangeInputValue: number = 0;

    onNumberInput() {
        this.applyButtonDisabled = false;

        this.clearButtonDisabled =
            +this.numberInputValue === this.minVal ? true : false;

        this.rangeInputValue = +this.numberInputValue;
    }

    onRangeInput() {
        this.applyButtonDisabled = false;

        this.clearButtonDisabled =
            this.rangeInputValue === this.minVal ? true : false;

        if (this.minimalValChange)
            this.numberInputValue = (
                Math.round(this.rangeInputValue / this.minimalValChange) *
                this.minimalValChange
            ).toString();
    }

    applyInputValues() {
        this.applyButtonDisabled = true;
    }

    clearInputValues() {
        this.clearButtonDisabled = true;

        this.numberInputValue = '';
        this.rangeInputValue = this.minVal;
    }
}
