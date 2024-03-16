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
import { FiltersService } from 'src/app/services/filters.service';
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
    @Input() filterName!: string;
    @Input() generalFilterName!: string;
    @Input() connectedToFilter: RangeFilters | undefined;
    @Output() rangeInputValueChangeEvent = new EventEmitter<number>();
    @Output() dropdownCloseEvent = new EventEmitter<void>();

    applyButtonAvailable: boolean = true;
    clearButtonAvailable: boolean = true;

    currentNumberInputValue!: string;
    lastlyAppliedNumberInputValue!: string;

    currentRangeInputValue!: number;
    lastlyAppliedRangeInputValue!: number;

    constructor(
        private userService: UserService,
        private filtersService: FiltersService
    ) {}

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
            this.applyButtonAvailable = true;
        } else {
            this.applyButtonAvailable = false;
        }

        if (
            (+this.currentNumberInputValue === this.minVal &&
                this.minOrMax === 'min') ||
            (+this.currentNumberInputValue === this.maxVal &&
                this.minOrMax === 'max')
        ) {
            this.clearButtonAvailable = true;
        } else {
            this.clearButtonAvailable = false;
        }

        this.currentRangeInputValue = +this.currentNumberInputValue;

        this.rangeInputValueChangeEvent.emit(this.currentRangeInputValue);
    }

    onRangeInput() {
        if (this.currentRangeInputValue === this.lastlyAppliedRangeInputValue) {
            this.applyButtonAvailable = true;
        } else {
            this.applyButtonAvailable = false;
        }

        if (
            (this.currentRangeInputValue === this.minVal &&
                this.minOrMax === 'min') ||
            (this.currentRangeInputValue === this.maxVal &&
                this.minOrMax === 'max')
        ) {
            this.clearButtonAvailable = true;
        } else {
            this.clearButtonAvailable = false;
        }

        if (
            this.filterName === 'productionYearFrom' ||
            this.filterName === 'productionYearUpTo'
        ) {
            this.minimalValChange = 1;
        } else {
            if (this.currentRangeInputValue > 1000000) {
                this.minimalValChange = 100000;
            } else if (this.currentRangeInputValue > 10000) {
                this.minimalValChange = 1000;
            } else if (this.currentRangeInputValue > 1000) {
                this.minimalValChange = 100;
            } else {
                this.minimalValChange = 10;
            }
        }

        this.currentNumberInputValue = (
            Math.round(this.currentRangeInputValue / this.minimalValChange) *
            this.minimalValChange
        ).toString();

        this.currentRangeInputValue = +this.currentNumberInputValue;

        this.rangeInputValueChangeEvent.emit(this.currentRangeInputValue);
    }

    applyInputValues() {
        this.lastlyAppliedRangeInputValue = +this.currentNumberInputValue;
        this.lastlyAppliedNumberInputValue = this.currentNumberInputValue;

        this.filtersService.updateFiltersRangeOptions(
            this.generalFilterName,
            this.minOrMax,
            +this.currentNumberInputValue
        );

        this.dropdownCloseEvent.emit();
        this.applyButtonAvailable = true;
        this.clearButtonAvailable = true;
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

        this.clearButtonAvailable = true;
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
            this.clearButtonAvailable = true;
            const value = this.minOrMax === 'min' ? this.minVal : this.maxVal;
            this.currentRangeInputValue = value;
            this.currentNumberInputValue = String(value);
            this.rangeInputValueChangeEvent.emit(value);
        }
    }
}
