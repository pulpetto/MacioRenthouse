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

    currentNumberInputValue: string = '';
    lastlyAppliedNumberInputValue!: string;

    currentRangeInputValue!: number;
    lastlyAppliedRangeInputValue!: number;

    constructor(private searchingService: SearchingService) {}

    ngOnInit() {
        if (this.minOrMax === 'max') {
            this.currentRangeInputValue = this.maxVal;
            this.lastlyAppliedRangeInputValue = this.maxVal;
            this.lastlyAppliedNumberInputValue = this.maxVal.toString();
        }

        if (this.minOrMax === 'min') {
            this.currentRangeInputValue = this.minVal;
            this.lastlyAppliedRangeInputValue = this.minVal;
            this.lastlyAppliedNumberInputValue = this.minVal.toString();
        }
    }

    onNumberInput() {
        this.applyButtonDisabled = false;

        this.clearButtonDisabled =
            +this.currentNumberInputValue === this.minVal ? true : false;

        this.currentRangeInputValue = +this.currentNumberInputValue;

        this.rangeInputValueChangeEvent.emit(this.currentRangeInputValue);
    }

    onRangeInput() {
        if (this.currentRangeInputValue === this.lastlyAppliedRangeInputValue) {
            this.applyButtonDisabled = true;
        } else {
            this.applyButtonDisabled = false;
        }

        this.clearButtonDisabled =
            this.currentRangeInputValue === this.minVal ? true : false;

        if (this.minimalValChange)
            this.currentNumberInputValue = (
                Math.round(
                    this.currentRangeInputValue / this.minimalValChange
                ) * this.minimalValChange
            ).toString();

        this.rangeInputValueChangeEvent.emit(+this.currentNumberInputValue);
    }

    applyInputValues() {
        this.lastlyAppliedRangeInputValue = this.currentRangeInputValue;
        this.lastlyAppliedNumberInputValue = this.currentNumberInputValue;

        if (this.connectedToFilter) {
            const filtersState = this.searchingService.getCurrentFiltersState();
            filtersState.rangeFilters[this.connectedToFilter] =
                this.currentRangeInputValue;
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
        this.currentNumberInputValue = '';

        if (this.minOrMax === 'max') {
            this.currentRangeInputValue = this.maxVal;
            this.lastlyAppliedRangeInputValue = this.maxVal;
            this.lastlyAppliedNumberInputValue = this.maxVal.toString();
            this.rangeInputValueChangeEvent.emit(this.maxVal);
        }

        if (this.minOrMax === 'min') {
            this.currentRangeInputValue = this.minVal;
            this.lastlyAppliedRangeInputValue = this.minVal;
            this.lastlyAppliedNumberInputValue = this.minVal.toString();
            this.rangeInputValueChangeEvent.emit(this.minVal);
        }
    }
}
