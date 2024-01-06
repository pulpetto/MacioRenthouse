import { Component, Input } from '@angular/core';
import { Options } from 'ngx-slider-v2';

@Component({
    selector: 'app-range-input',
    templateUrl: './range-input.component.html',
    styleUrls: ['./range-input.component.css'],
})
export class RangeInputComponent {
    @Input() minVal!: number;
    @Input() maxVal!: number;
    @Input() suffix!: string;
    @Input() minimalValChange!: number;
    @Input() ngxMask!: string;

    applyButtonDisabled: boolean = true;
    clearButtonDisabled: boolean = true;

    numberInputValue: string = '';
    rangeInputValue: number = 0;

    // ngx config
    minValue: number = 50;
    maxValue: number = 200;
    options: Options = {
        floor: 0,
        ceil: 250,
    };

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
