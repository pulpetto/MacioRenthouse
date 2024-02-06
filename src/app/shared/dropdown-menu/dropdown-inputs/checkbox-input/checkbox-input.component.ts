import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';
import { FormControl } from '@angular/forms';
import { MultiOptionFilters } from 'src/app/interfaces/multi-option-filters';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-checkbox-input',
    templateUrl: './checkbox-input.component.html',
    styleUrls: ['./checkbox-input.component.css'],
})
export class CheckboxInputComponent implements OnInit, OnChanges {
    searchTerm: string = '';

    @Input() dropdownOptions!: string[];
    @Input() dropdownMultiselect!: boolean;
    @Input() control?: FormControl | undefined;
    @Input() connectedToFilter: MultiOptionFilters | undefined;

    @Output() orderingChangeEvent = new EventEmitter<string>();
    @Output() sortingChangeEvent = new EventEmitter<string>();
    @Output() maxOffersPerPageChangeEvent = new EventEmitter<string>();
    @Output() calculateHeightEvent = new EventEmitter<void>();
    @Output() checkedOptionsChangeEvent = new EventEmitter<number>();
    @Output() dropdownCloseEvent = new EventEmitter<void>();

    dropdownOptionsConverted: {
        id: string;
        name: string;
        checked: boolean;
    }[] = [];
    // for searching purposes
    dropdownOptionsConvertedCopy: {
        id: string;
        name: string;
        checked: boolean;
    }[] = [];

    anyOptionChecked: boolean = false;

    applyButtonDisabled: boolean = true;
    clearButtonDisabled: boolean = true;

    constructor(
        private userService: UserService,
        private utilityService: UtilityService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.convertDropdowns();

        this.dropdownOptionsConvertedCopy = this.dropdownOptionsConverted;

        this.dropdownOptionsConvertedCopy.forEach(
            (option) => (option.name = option.name.toLowerCase())
        );
    }

    ngOnChanges(changes: SimpleChanges) {
        if ('dropdownOptions' in changes) {
            this.convertDropdowns();
        }
    }

    convertDropdowns() {
        this.dropdownOptionsConverted = this.dropdownOptions.map(
            (optionName, index) => ({
                id: this.utilityService.generateRandomString(10),
                name: optionName,
                checked:
                    index === 0 && this.dropdownMultiselect === false
                        ? true
                        : false,
            })
        );
    }

    onDropdownPropertySearch() {
        const filteredOptions = this.dropdownOptionsConvertedCopy.filter(
            (option) => option.name.startsWith(this.searchTerm.toLowerCase())
        );

        this.dropdownOptionsConverted = filteredOptions;

        this.cdr.detectChanges();
        this.calculateHeightEvent.emit();
    }

    updateAnyOptionsCheckedState() {
        this.anyOptionChecked = this.dropdownOptionsConverted.some(
            (option) => option.checked
        );

        this.clearButtonDisabled = !this.anyOptionChecked;
    }

    onInputClick(
        option: {
            id: string;
            name: string;
            checked: boolean;
        },
        $event: Event
    ) {
        this.updateAnyOptionsCheckedState();

        this.applyButtonDisabled = false;

        this.control?.setValue(option.name);

        if (!this.dropdownMultiselect) {
            if (option.checked) $event.preventDefault();
            if (!option.checked) {
                this.dropdownOptionsConverted.forEach(
                    (option) => (option.checked = false)
                );
                option.checked = true;

                // emitt to the event with name from input to avoid repeating
                this.orderingChangeEvent.emit(option.name);
                this.sortingChangeEvent.emit(option.name);
                this.maxOffersPerPageChangeEvent.emit(option.name);
            }
        } else {
            let incrementOrDecrement = option.checked ? -1 : 1;

            const checkedOptionsCount: number =
                this.dropdownOptionsConverted.filter((option) => option.checked)
                    .length + incrementOrDecrement;

            this.checkedOptionsChangeEvent.emit(checkedOptionsCount);
        }
    }

    applyAllOptions() {
        if (this.connectedToFilter) {
            const checkedOptions: string[] = [];

            this.dropdownOptionsConverted.forEach((option) => {
                if (option.checked)
                    checkedOptions.push(
                        this.utilityService.capitalizeEveryWord(option.name)
                    );
            });

            const filtersState = this.userService.getCurrentFiltersState();
            if (filtersState) {
                filtersState.multiOptionsFilters[this.connectedToFilter] =
                    checkedOptions;
                this.userService.updateFiltersState(filtersState);
            }
        }

        this.dropdownCloseEvent.emit();
        this.applyButtonDisabled = true;
    }

    clearAllOptions() {
        if (this.connectedToFilter) {
            const filtersState = this.userService.getCurrentFiltersState();
            if (filtersState) {
                filtersState.multiOptionsFilters[this.connectedToFilter] = [];
                this.userService.updateFiltersState(filtersState);
            }
        }

        this.applyButtonDisabled = false;

        this.dropdownOptionsConvertedCopy.forEach(
            (option) => (option.checked = false)
        );
        this.dropdownOptionsConverted.forEach(
            (option) => (option.checked = false)
        );

        this.updateAnyOptionsCheckedState();

        const checkedOptionsCount: number =
            this.dropdownOptionsConverted.filter(
                (option) => option.checked
            ).length;
        this.checkedOptionsChangeEvent.emit(checkedOptionsCount);
    }
}
