import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { RangeFilters } from 'src/app/interfaces/range-filters';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-range-input',
    templateUrl: './range-input.component.html',
    styleUrls: ['./range-input.component.css'],
})
export class RangeInputComponent implements OnInit, OnChanges {
    @Input() minVal!: number;
    @Input() maxVal!: number;
    @Input() suffix: string = '';
    @Input() minimalValChange!: number;
    @Input() minOrMax!: 'min' | 'max';
    @Input() ngxMask!: string;
    @Input() filterGeneralName!: string;
    @Input() connectedToFilter: RangeFilters | undefined;
    @Output() rangeInputValueChangeEvent = new EventEmitter<number>();
    @Output() dropdownCloseEvent = new EventEmitter<void>();

    applyButtonDisabled: boolean = true;
    clearButtonDisabled: boolean = true;

    currentNumberInputValue!: string;
    lastlyAppliedNumberInputValue!: string;

    currentRangeInputValue!: number;
    lastlyAppliedRangeInputValue!: number;

    constructor(private userService: UserService) {}

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

    ngOnChanges(changes: SimpleChanges) {
        if (
            ('minVal' in changes && this.minOrMax === 'min') ||
            ('maxVal' in changes && this.minOrMax === 'max')
        ) {
            const value = this.minOrMax === 'min' ? this.minVal : this.maxVal;
            this.currentRangeInputValue = value;
            this.currentNumberInputValue = String(value);
            this.rangeInputValueChangeEvent.emit(value);
        }

        if (
            (this.currentRangeInputValue === this.minVal &&
                this.minOrMax === 'min') ||
            (this.currentRangeInputValue === this.maxVal &&
                this.minOrMax === 'max')
        )
            this.currentNumberInputValue = '';
    }

    onNumberInput() {
        if (
            +this.currentNumberInputValue ===
            +this.lastlyAppliedNumberInputValue
        ) {
            this.applyButtonDisabled = true;
        } else {
            this.applyButtonDisabled = false;
        }

        if (
            (+this.currentNumberInputValue === this.minVal &&
                this.minOrMax === 'min') ||
            (+this.currentNumberInputValue === this.maxVal &&
                this.minOrMax === 'max')
        ) {
            this.clearButtonDisabled = true;
        } else {
            this.clearButtonDisabled = false;
        }

        this.currentRangeInputValue = +this.currentNumberInputValue;

        this.rangeInputValueChangeEvent.emit(this.currentRangeInputValue);
    }

    onRangeInput() {
        if (this.currentRangeInputValue === this.lastlyAppliedRangeInputValue) {
            this.applyButtonDisabled = true;
        } else {
            this.applyButtonDisabled = false;
        }

        if (
            (this.currentRangeInputValue === this.minVal &&
                this.minOrMax === 'min') ||
            (this.currentRangeInputValue === this.maxVal &&
                this.minOrMax === 'max')
        ) {
            this.clearButtonDisabled = true;
        } else {
            this.clearButtonDisabled = false;
        }

        if (this.minimalValChange) {
            if (this.currentRangeInputValue > 1000000) {
                this.minimalValChange = 100000;
            } else if (this.currentRangeInputValue > 10000) {
                this.minimalValChange = 1000;
            } else if (this.currentRangeInputValue > 1000) {
                this.minimalValChange = 100;
            } else {
                this.minimalValChange = 10;
            }

            this.currentNumberInputValue = (
                Math.round(
                    this.currentRangeInputValue / this.minimalValChange
                ) * this.minimalValChange
            ).toString();

            this.currentRangeInputValue = +this.currentNumberInputValue;
        }

        this.rangeInputValueChangeEvent.emit(+this.currentNumberInputValue);
    }

    applyInputValues() {
        this.lastlyAppliedRangeInputValue = +this.currentNumberInputValue;
        this.lastlyAppliedNumberInputValue = this.currentNumberInputValue;

        if (this.connectedToFilter) {
            const filtersState = this.userService.getCurrentFiltersState();
            if (filtersState) {
                filtersState.rangeFilters[this.filterGeneralName][
                    this.connectedToFilter
                ] = +this.currentNumberInputValue;
                this.userService.updateFiltersState(filtersState);
            }
        }

        this.dropdownCloseEvent.emit();
        this.applyButtonDisabled = true;
    }

    clearInputValues() {
        if (this.connectedToFilter) {
            const filtersState = this.userService.getCurrentFiltersState();
            if (filtersState) {
                if (this.minOrMax === 'min')
                    filtersState.rangeFilters[this.filterGeneralName][
                        this.connectedToFilter
                    ] = this.minVal;

                if (this.minOrMax === 'max')
                    filtersState.rangeFilters[this.filterGeneralName][
                        this.connectedToFilter
                    ] = this.maxVal;

                this.userService.updateFiltersState(filtersState);
            }
        }

        this.clearButtonDisabled = true;
        this.currentNumberInputValue = '';

        if (this.minOrMax === 'max') {
            this.currentRangeInputValue = this.maxVal;
            this.lastlyAppliedRangeInputValue = this.maxVal;
            this.lastlyAppliedNumberInputValue = this.maxVal.toString();
            this.rangeInputValueChangeEvent.emit(this.maxVal);
            this.applyInputValues();
        }

        if (this.minOrMax === 'min') {
            this.currentRangeInputValue = this.minVal;
            this.lastlyAppliedRangeInputValue = this.minVal;
            this.lastlyAppliedNumberInputValue = this.minVal.toString();
            this.rangeInputValueChangeEvent.emit(this.minVal);
            this.applyInputValues();
        }
    }

    resetRangeValue() {
        if (this.minOrMax === 'min' || this.minOrMax === 'max') {
            this.clearButtonDisabled = true;
            const value = this.minOrMax === 'min' ? this.minVal : this.maxVal;
            this.currentRangeInputValue = value;
            this.currentNumberInputValue = String(value);
            this.rangeInputValueChangeEvent.emit(value);
        }
    }
}
