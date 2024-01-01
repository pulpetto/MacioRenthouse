import { Component, Input } from '@angular/core';

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

    numberInputValue: string = '';
    rangeInputValue: number = 0;

    onNumberInput() {
        if (+this.numberInputValue > this.maxVal) {
            this.numberInputValue = this.maxVal.toString();
        }

        this.rangeInputValue = +this.numberInputValue;
    }

    onRangeInput() {
        if (this.minimalValChange)
            this.numberInputValue = (
                Math.round(this.rangeInputValue / this.minimalValChange) *
                this.minimalValChange
            ).toString();
    }
}
