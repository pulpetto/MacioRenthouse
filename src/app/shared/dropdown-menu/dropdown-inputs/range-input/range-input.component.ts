import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RangeFilters } from 'src/app/interfaces/range-filters';
import { SearchingService } from 'src/app/services/searching.service';

@Component({
    selector: 'app-range-input',
    templateUrl: './range-input.component.html',
    styleUrls: ['./range-input.component.css'],
})
export class RangeInputComponent implements OnInit {
    @Input() minVal!: number;
    @Input() maxVal!: number;
    @Input() suffix: string = '';
    @Input() minimalValChange!: number;
    @Input() minOrMax!: 'min' | 'max';
    @Input() ngxMask!: string;
    @Input() connectedToFilter: RangeFilters | undefined;
    @Output() rangeInputValueChangeEvent = new EventEmitter<number>();

    applyButtonDisabled: boolean = true;
    clearButtonDisabled: boolean = true;

    numberInputValue: string = '';
    rangeInputValue!: number;

    constructor(private searchingService: SearchingService) {}

    ngOnInit() {
        if (this.minOrMax === 'max') {
            this.rangeInputValue = this.maxVal;
        }

        if (this.minOrMax === 'min') {
            this.rangeInputValue = this.minVal;
        }
    }

    onNumberInput() {
        this.applyButtonDisabled = false;

        this.clearButtonDisabled =
            +this.numberInputValue === this.minVal ? true : false;

        this.rangeInputValue = +this.numberInputValue;

        this.rangeInputValueChangeEvent.emit(this.rangeInputValue);
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

        this.rangeInputValueChangeEvent.emit(+this.numberInputValue);
    }

    applyInputValues() {
        if (this.connectedToFilter) {
            const filtersState = this.searchingService.getCurrentFiltersState();
            filtersState.rangeFilters[this.connectedToFilter] =
                this.rangeInputValue;
            this.searchingService.updateFiltersState(filtersState);
        }

        this.applyButtonDisabled = true;
    }

    clearInputValues() {
        if (this.connectedToFilter) {
            const filtersState = this.searchingService.getCurrentFiltersState();
            filtersState.rangeFilters[this.connectedToFilter] = this.minVal;
            this.searchingService.updateFiltersState(filtersState);
        }

        this.clearButtonDisabled = true;
        this.numberInputValue = '';

        if (this.minOrMax === 'max') {
            this.rangeInputValue = this.maxVal;
            this.rangeInputValueChangeEvent.emit(this.maxVal);
        }

        if (this.minOrMax === 'min') {
            this.rangeInputValue = this.minVal;
            this.rangeInputValueChangeEvent.emit(this.minVal);
        }
    }
}
